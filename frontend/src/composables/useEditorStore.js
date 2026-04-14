/**
 * useEditorStore.js — Client-side data store for the GraphNotes editor.
 *
 * State is loaded from the backend on mount (via init()) and kept in sync
 * through individual API calls on create, update, rename, and delete.
 * Folders are client-side only until PARENT_ID is added to DB_NOTES.
 *
 * ITEM SHAPE:
 * {
 *   id:            number        — server-assigned integer ID (folders use a temp client ID)
 *   name:          string        — display name (maps to backend `title`)
 *   content:       string | null — null = not yet lazy-loaded
 *   parentId:      number | null — folder parent (client-side only for now)
 *   type:          "file" | "folder"
 *   icon:          string        — Lucide icon name
 *   updatedAt:     string        — ISO 8601 timestamp
 *   lastVisitedAt: string | null — ISO 8601 timestamp, local only
 * }
 */

import { reactive, computed } from 'vue'
import {apiCreateFolder, indexNote, deleteNoteIndex, fetchNotes, fetchNote, createNote, updateNote, linkNotes, deleteNote,getNoteLinks,deleteNoteLinks, fetchTags, fetchNoteTags, syncNoteTags, createTag } from '../services/api.js'

// ─── FTS index sync (debounced to avoid firing on every keystroke) ────────────
let indexDebounceTimer = null
const INDEX_DEBOUNCE_MS = 1000

function debouncedIndexNote(id, name, content) {
  if (indexDebounceTimer) clearTimeout(indexDebounceTimer)
  indexDebounceTimer = setTimeout(() => {
    indexNote(id, { title: name, content }).catch(err => {
      console.warn('Failed to index note:', err.message)
    })
  }, INDEX_DEBOUNCE_MS)
}

// ─── Save debounce (backend) ──────────────────────────────────────────────────
let saveDebounceTimer = null

function debouncedSaveNote(id, title, content) {
  if (saveDebounceTimer) clearTimeout(saveDebounceTimer)
  saveDebounceTimer = setTimeout(() => {
    updateNote(id, title, content).catch(err => {
      console.warn('Failed to save note:', err.message)
    })
    // getNoteLinks(id).then((links)=>console.info(links)).catch((err)=>console.error(err));
    // linkNotes({
    //     links: [
    //         {
    //             from_id: id,
    //             to_ids: [1, 2, 3, 4, 5]
    //         }
    //     ]})
    //     .then(()=> console.info("linked note"))
    //     .catch((err)=> console.error(err));
    //   deleteNoteLinks({ links:
    //       [{"from_note_id":2,"to_note_id":1},{"from_note_id":3,"to_note_id":1},{"from_note_id":4,"to_note_id":1},{"from_note_id":5,"to_note_id":1},{"from_note_id":6,"to_note_id":1},{"from_note_id":7,"to_note_id":1}]
    //   })
    //     .then(()=> console.info("links deleted"))
    //     .catch((err)=> console.error(err));
    syncNoteLinks(id, content).catch(err => {
      console.warn('Failed to sync note links:', err.message)
    })
    syncContentTags(id, content).catch(err => {
      console.warn('Failed to sync note tags:', err.message)
    })
  }, INDEX_DEBOUNCE_MS)
}

// ─── Backend → editor item transform ─────────────────────────────────────────

function noteToItem(note) {
  return {
    id:            note.id,
    name:          note.title,
    content:       note.content ?? null,
    parentId:      null,
    type:          'file',
    icon:          'FileText',
    updatedAt:     note.updated_at,
    lastVisitedAt: null,
  }
}

// ─── Reactive state (module-level singleton so all components share one store) ─

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

const state = reactive({ items: [], activeFileId: null, loading: true })

// ─── Note link cache (noteId → { outbound: Set<id>, inbound: Set<id> }) ────────
const noteLinkCache = reactive({})

// ─── Tag state ────────────────────────────────────────────────────────────────
const noteTagCache    = reactive({})  // noteId → string[] (union — what the panel shows)
const contentTagCache = reactive({})  // noteId → string[] (derived from #tag in content)
const panelTagCache   = reactive({})  // noteId → string[] (added via panel / auto-tag)
const globalTags      = reactive([])  // [{ id, name, note_count }]

function parseContentTags(content) {
  const tagRegex = /#([\w-]+)/g
  const found = new Set()
  let match
  while ((match = tagRegex.exec(content)) !== null) found.add(match[1].toLowerCase())
  return [...found]
}

function rebuildNoteTagCache(noteId) {
  const union = new Set([
    ...(contentTagCache[noteId] ?? []),
    ...(panelTagCache[noteId]   ?? []),
  ])
  noteTagCache[noteId] = [...union]
}

// Parses #tag patterns from content and syncs to backend (debounced via debouncedSaveNote).
// Only associates tags that already exist in the global list — never creates new global tags.
// New global tags are created immediately when the user closes a #tag (space/enter/tab).
async function syncContentTags(noteId, content) {
  const allContentTags = parseContentTags(content)
  // Filter to only tags that already exist globally — prevents mid-word debounce from creating tags
  const existingNames = new Set(globalTags.map(t => t.name))
  contentTagCache[noteId] = allContentTags.filter(t => existingNames.has(t))
  rebuildNoteTagCache(noteId)
  const { tags: saved } = await syncNoteTags(noteId, noteTagCache[noteId])
  noteTagCache[noteId] = saved.map(t => t.name)
}

// Creates a global tag if it doesn't exist yet and adds it to the in-memory list.
// Called immediately when the user closes a #tag with space/enter/tab.
async function ensureGlobalTag(name) {
  if (globalTags.find(t => t.name === name)) return
  try {
    const result = await createTag(name)
    globalTags.push({ id: result.id, name, note_count: 0 })
  } catch { /* ignore — tag may have been created concurrently */ }
}

// Parses [[Note Name]] patterns from content and syncs links to the backend.
async function syncNoteLinks(noteId, content) {
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g
  const linkedNames = new Set()
  let match
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    linkedNames.add(match[1].trim())
  }

  const newLinkedIds = []
  for (const name of linkedNames) {
    const item = state.items.find(i =>
      i.type === 'file' && i.name.toLowerCase() === name.toLowerCase() && i.id !== noteId
    )
    if (item) newLinkedIds.push(item.id)
  }
  const newLinkedSet = new Set(newLinkedIds)

  const current = noteLinkCache[noteId]
  const currentOutbound = current ? current.outbound : new Set()

  const toAdd = newLinkedIds.filter(id => !currentOutbound.has(id))
  const toRemove = [...currentOutbound].filter(id => !newLinkedSet.has(id))

  if (toAdd.length > 0) {
    await linkNotes({ links: [{ from_id: noteId, to_ids: toAdd }] })
  }
  if (toRemove.length > 0) {
    await deleteNoteLinks({ links: toRemove.map(id => ({ from_note_id: noteId, to_note_id: id })) })
  }

  if (!noteLinkCache[noteId]) noteLinkCache[noteId] = { outbound: new Set(), inbound: new Set() }
  noteLinkCache[noteId].outbound = newLinkedSet
}

// ─── Composable ───────────────────────────────────────────────────────────────

export function useEditorStore() {

  /** The currently open file object, or null if none is selected. */
  const activeFile = computed(() =>
    state.items.find(i => i.id === state.activeFileId && i.type === 'file') || null
  )

  /** All top-level items (files and folders with no parent). */
  const rootItems = computed(() =>
    state.items.filter(i => i.parentId === null)
  )

  /**
   * Returns the direct children of a given folder.
   * Used by the sidebar tree to render nested items recursively.
   */
  function getChildren(parentId) {
    return state.items.filter(i => i.parentId === parentId)
  }

  /**
   * Sets the currently active/open file by ID and stamps its lastVisitedAt time.
   * Lazy-loads full content from GET /api/notes/:id on first open.
   *
   * TODO — Backend (optional): PATCH /api/notes/:id
   * Request body: { lastVisitedAt: string } — useful if you want cross-device
   * "recently visited" to sync. Otherwise keep client-side only.
   */
  async function setActiveFile(id) {
    const item = state.items.find(i => i.id === id && i.type === 'file')
    if (item) {
      item.lastVisitedAt = new Date().toISOString()
      // Lazy-load content on first open
      if (item.content === null) {
        try {
          const note = await fetchNote(id)
          item.content = note.content ?? ''
        } catch (err) {
          console.warn(`Failed to fetch note ${id}:`, err.message)
          item.content = ''
        }
      }
      // Set active ID only after content is ready so the editor watch fires with real content
      state.activeFileId = id
      // Lazy-load note tags if not yet cached — split into content vs panel tags.
      // Guard on panelTagCache (not noteTagCache) since syncContentTags can set noteTagCache
      // before setActiveFile runs, which would incorrectly skip two-cache initialization.
      if (panelTagCache[id] === undefined) {
        try {
          const tags = await fetchNoteTags(id)
          const dbTagNames = tags.map(t => t.name)
          const contentTags = new Set(parseContentTags(item.content ?? ''))
          contentTagCache[id] = [...contentTags]
          panelTagCache[id]   = dbTagNames.filter(name => !contentTags.has(name))
          noteTagCache[id]    = dbTagNames
        } catch {
          contentTagCache[id] = []
          panelTagCache[id]   = []
          noteTagCache[id]    = []
        }
      }
      // Load note links if not yet cached
      if (!noteLinkCache[id]) {
        try {
          const links = await getNoteLinks(id)
          noteLinkCache[id] = {
            outbound: new Set(links.filter(l => l.from_note_id === id).map(l => l.to_note_id)),
            inbound:  new Set(links.filter(l => l.to_note_id   === id).map(l => l.from_note_id)),
          }
        } catch (err) {
          console.warn(`Failed to load links for note ${id}:`, err.message)
          noteLinkCache[id] = { outbound: new Set(), inbound: new Set() }
        }
      }
    }
  }

  /**
   * The 8 most recently visited files, sorted newest-first.
   * Falls back to updatedAt for files that have never been explicitly opened
   * (e.g. created before this field existed, or via the backend).
   * Used by the Dashboard "Recently visited" section.
   */
  const recentFiles = computed(() =>
    state.items
      .filter(i => i.type === 'file')
      .slice()
      .sort((a, b) => {
        const ta = a.lastVisitedAt || a.updatedAt || ''
        const tb = b.lastVisitedAt || b.updatedAt || ''
        return tb.localeCompare(ta)
      })
      .slice(0, 8)
  )

  /**
   * Creates a new empty note and opens it in the editor.
   *
   * Backend: POST /api/notes
   * Request body:  { title: string, content: string }
   * Expected response: { id: number }
   */
  async function createFile(parentId = null, title = 'Untitled') {
    const { id } = await createNote(title, '')
    const item = noteToItem({ id, title, content: '', updated_at: new Date().toISOString() })
    item.parentId = parentId
    state.items.push(item)
    state.activeFileId = id
    indexNote(id, { title, content: '' }).catch(err => {
      console.warn('Failed to index new note:', err.message)
    })
    return id
  }

  /**
   * Creates a new folder in the sidebar tree (client-side only).
   *
   * TODO — Backend: POST /api/notes
   * Request body:  { title: string, parentId: number | null, type: "folder" }
   * Expected response: the created item (including server-generated id)
   * Requires PARENT_ID column in DB_NOTES.
   */
  async function createFolder(parentId = null) {

    const res = await apiCreateFolder(parentId, "New Folder");
    const id = res.id;

    state.items.push({
      id, name: 'New Folder', parentId, type: 'folder',
      updatedAt: new Date().toISOString(),
    })
    return id
  }

  /**
   * Saves the markdown content of a note. Debounced 1s to avoid hammering the server.
   *
   * Backend: POST /api/notes/:id/update
   * Request body:  { title: string, content: string }
   * Expected response: { id, title, content, created_at, updated_at }
   */
  function updateFileContent(id, content) {
    const item = state.items.find(i => i.id === id)
    if (item && item.type === 'file') {
      item.content = content
      item.updatedAt = new Date().toISOString()
      debouncedSaveNote(id, item.name, content)
      debouncedIndexNote(id, item.name, content)
    }
  }

  /**
   * Updates the icon of a file. Called when the user picks from the IconPicker.
   *
   * TODO — Backend: PATCH /api/notes/:id
   * Request body:  { icon: string }  (icon name key, e.g. "Lightbulb")
   * Expected response: { updatedAt: string }
   */
  function updateItemIcon(id, iconName) {
    const item = state.items.find(i => i.id === id)
    if (item) {
      item.icon = iconName
      item.updatedAt = new Date().toISOString()
    }
  }

  /**
   * Renames a file or folder. Triggered by double-clicking an item in the sidebar.
   *
   * TODO — Backend: PATCH /api/notes/:id
   * Request body:  { name: string }
   * Expected response: { updatedAt: string }
   * On success: update item.name and item.updatedAt
   */
  function renameItem(id, newName) {
    const item = state.items.find(i => i.id === id)
    if (item) {
      item.name = newName
      item.updatedAt = new Date().toISOString()
      if (item.type === 'file') {
        updateNote(id, newName, item.content || '').catch(err => {
          console.warn(`Failed to rename note ${id}:`, err.message)
        })
        debouncedIndexNote(id, newName, item.content || '')
      }
    }
  }

  /**
   * Deletes a file or folder. If a folder is deleted, all of its children are
   * deleted recursively first (handled client-side here; the backend may handle
   * cascading deletes at the database level instead).
   *
   * TODO — Backend: DELETE /api/notes/:id
   * No request body needed.
   * The backend should cascade-delete all children if the item is a folder.
   * On success: remove the item (and its children) from state.items
   * If the deleted item was the active file, open the next available file.
   */
  function deleteItem(id) {
    const item = state.items.find(i => i.id === id)
    if (item && item.type === 'file') {
      deleteNote(id).catch(err => {
        console.warn(`Failed to delete note ${id} from backend:`, err.message)
      })
      deleteNoteIndex(id).catch(err => {
        console.warn('Failed to remove note from index:', err.message)
      })
    }
    const children = state.items.filter(i => i.parentId === id)
    children.forEach(c => deleteItem(c.id))
    const idx = state.items.findIndex(i => i.id === id)
    if (idx !== -1) state.items.splice(idx, 1)
    if (state.activeFileId === id) {
      const firstFile = state.items.find(i => i.type === 'file')
      state.activeFileId = firstFile ? firstFile.id : null
    }
  }

  /** Total number of notes (files only) in the vault. Shown in the sidebar footer. */
  const fileCount = computed(() => state.items.filter(i => i.type === 'file').length)

  /**
   * Searches notes and folders by name (client-side, case-insensitive).
   *
   * TODO — Backend (optional): GET /api/notes/search?q=:query
   * If full-text search across note *content* is needed, this should hit the
   * backend. For name-only search the current client-side filter is sufficient.
   * Expected response: Item[]
   */
  function searchItems(query) {
    if (!query) return []
    const q = query.toLowerCase()
    return state.items.filter(i => i.name.toLowerCase().includes(q))
  }

  /** Returns the union of content + panel tags for a note. */
  function getNoteTags(noteId) {
    return noteTagCache[noteId] ?? []
  }

  /** Returns only the tags derived from #tag text in the note content. */
  function getContentTags(noteId) {
    return contentTagCache[noteId] ?? []
  }

  /** Returns only the tags added via panel or auto-tag. */
  function getPanelTags(noteId) {
    return panelTagCache[noteId] ?? []
  }

  /** Merges tags into the panel cache and syncs the union to the backend. Used by auto-tag. */
  async function setNoteTags(noteId, tags) {
    const merged = new Set([...(panelTagCache[noteId] ?? []), ...tags])
    panelTagCache[noteId] = [...merged]
    rebuildNoteTagCache(noteId)
    const { tags: saved } = await syncNoteTags(noteId, noteTagCache[noteId])
    noteTagCache[noteId] = saved.map(t => t.name)
    const fresh = await fetchTags()
    globalTags.splice(0, globalTags.length, ...fresh)
  }

  /** Re-fetches note tags from backend and repopulates both caches. Called by panel refresh. */
  async function reloadNoteTags(noteId) {
    const item = state.items.find(i => i.id === noteId)
    if (!item) return
    try {
      const tags = await fetchNoteTags(noteId)
      const dbTagNames = tags.map(t => t.name)
      const existingNames = new Set(globalTags.map(g => g.name))
      const contentTags = new Set(parseContentTags(item.content ?? '').filter(t => existingNames.has(t)))
      contentTagCache[noteId] = [...contentTags]
      panelTagCache[noteId]   = dbTagNames.filter(name => !contentTags.has(name))
      noteTagCache[noteId]    = dbTagNames
    } catch { /* keep existing cache on error */ }
  }

  /** Removes a panel-managed tag and syncs to backend. */
  async function deletePanelTag(noteId, tagName) {
    panelTagCache[noteId] = (panelTagCache[noteId] ?? []).filter(t => t !== tagName)
    rebuildNoteTagCache(noteId)
    const { tags: saved } = await syncNoteTags(noteId, noteTagCache[noteId])
    noteTagCache[noteId] = saved.map(t => t.name)
    const fresh = await fetchTags()
    globalTags.splice(0, globalTags.length, ...fresh)
  }

  /** Returns notes that the given note links to (outbound) and notes that link to it (inbound). */
  function getLinkedNotes(noteId) {
    const cache = noteLinkCache[noteId]
    if (!cache) return { outbound: [], inbound: [] }
    const outbound = [...cache.outbound].map(id => state.items.find(i => i.id === id)).filter(Boolean)
    const inbound  = [...cache.inbound].map(id => state.items.find(i => i.id === id)).filter(Boolean)
    return { outbound, inbound }
  }

  async function init() {
    if (state.items.length > 0) return
    state.loading = true
    try {
      const [notes, tags] = await Promise.all([fetchNotes(), fetchTags()])
      globalTags.splice(0, globalTags.length, ...tags)
      const folders = state.items.filter(i => i.type === 'folder')
      const backendFiles = notes.map(noteToItem)
      state.items.splice(0, state.items.length, ...folders, ...backendFiles)
      if (!state.items.find(i => i.id === state.activeFileId)) {
        const firstFile = state.items.find(i => i.type === 'file')
        if (firstFile) await setActiveFile(firstFile.id)
      }
    } catch (err) {
      console.warn('Failed to load notes from backend, using local data:', err.message)
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    loading: computed(() => state.loading),
    activeFile,
    rootItems,
    getChildren,
    setActiveFile,
    createFile,
    createFolder,
    updateFileContent,
    renameItem,
    deleteItem,
    fileCount,
    recentFiles,
    searchItems,
    updateItemIcon,
    getLinkedNotes,
    syncNoteLinks,
    globalTags,
    getNoteTags,
    getContentTags,
    getPanelTags,
    setNoteTags,
    deletePanelTag,
    reloadNoteTags,
    ensureGlobalTag,
    init,
  }
}
