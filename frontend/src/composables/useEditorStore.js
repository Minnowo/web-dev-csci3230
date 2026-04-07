/**
 * useEditorStore.js — Client-side data store for the GraphNotes editor.
 *
 * CURRENT IMPLEMENTATION: All data is persisted to localStorage under the key
 * "graphnotes-vault". This is a temporary stand-in until the backend is ready.
 *
 * FOR BACKEND INTEGRATION:
 * Each function below is annotated with the expected REST API endpoint it should
 * call once the backend is available. The UI components do not need to change —
 * only this file needs to be updated to swap localStorage calls for API calls.
 *
 * EXPECTED DATA SHAPE (note/folder item):
 * {
 *   id:        string   — unique identifier (UUID from backend)
 *   name:      string   — display name of the file or folder
 *   content:   string   — markdown content (files only, omit for folders)
 *   parentId:  string | null — ID of the parent folder, null = root level
 *   type:      "file" | "folder"
 *   updatedAt: string   — ISO 8601 timestamp of last modification
 * }
 *
 * AUTHENTICATION:
 * All API calls should include the user's auth token. The api.js service layer
 * in services/api.js is the recommended place to attach headers/interceptors.
 */

import { reactive, computed, watch } from 'vue'
import { indexNote, deleteNoteIndex } from '../services/api.js'

const STORAGE_KEY = 'graphnotes-vault'

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

// ─── Temporary localStorage helpers (remove when backend is connected) ────────

function generateId() {
  // TODO: Remove this once backend generates IDs server-side (UUIDs)
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function loadFromStorage() {
  // TODO: Replace with GET /api/notes — fetch all notes and folders for the
  // authenticated user. Expected response: { items: Item[], activeFileId: string }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return null
}

function createDefaultData() {
  // TODO: Remove this entire function once loadFromStorage() calls the real API.
  // This only exists to seed the UI with sample data during local development.
  const folderId = generateId()
  const ids = Array.from({ length: 12 }, () => generateId())
  const now = new Date().toISOString()

  return {
    items: [
      { id: ids[0], name: 'Meeting Notes', content: 'Discussed the new dashboard layout with the team. We agreed on a sidebar navigation pattern and will use D3 for the graph visualization. Next sprint starts Monday.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: now },
      { id: ids[1], name: 'Recipe Collection', content: 'Grandmas pasta sauce recipe: tomatoes, garlic, basil, olive oil. Simmer for two hours on low heat. Add parmesan at the end. Perfect for Sunday dinners.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
      { id: folderId, name: 'Project Notes', parentId: null, type: 'folder', updatedAt: now },
      { id: ids[2], name: 'Backend Architecture', content: 'The backend uses Express with TypeScript and SQLite. Authentication is handled via JWT tokens. We have a migration system for database schema changes.', parentId: folderId, type: 'file', icon: 'Lightbulb', updatedAt: now, lastVisitedAt: null },
      { id: ids[3], name: 'Frontend Components', content: 'Vue 3 composition API with reactive stores. Editor uses contenteditable div with markdown conversion. Sidebar has a recursive tree for nested folders.', parentId: folderId, type: 'file', icon: 'Lightbulb', updatedAt: now, lastVisitedAt: null },
      { id: ids[4], name: 'Workout Plan', content: 'Monday: chest and triceps. Wednesday: back and biceps. Friday: legs and shoulders. Run three times a week for cardio. Rest on weekends.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
      { id: ids[5], name: 'Book Recommendations', content: 'Clean Code by Robert Martin. Designing Data Intensive Applications by Martin Kleppmann. The Pragmatic Programmer by Hunt and Thomas. All great for software engineering.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
      { id: ids[6], name: 'Sprint Retro', content: 'The team discussed what went well with the dashboard sprint. Frontend components are solid but the backend migration took longer than expected. Need better testing next sprint.', parentId: folderId, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
      { id: ids[7], name: 'Database Design', content: 'SQLite with FTS5 for full-text search. Migration system handles schema versioning. Backend stores notes with title and content. TypeScript types keep the API layer clean.', parentId: folderId, type: 'file', icon: 'Lightbulb', updatedAt: now, lastVisitedAt: null },
      { id: ids[8], name: 'Cooking Journal', content: 'Tried a new pasta recipe tonight with garlic bread on the side. The sauce needed more basil. Sunday dinners are becoming a tradition.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
      { id: ids[9], name: 'Running Log', content: 'Ran five kilometers today. Cardio is improving since starting the workout plan. Legs were sore from Friday but pushed through.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
      { id: ids[10], name: 'Dashboard Wireframe', content: 'Sketched the sidebar navigation and graph visualization layout. D3 force simulation for the node graph. Team meeting tomorrow to review the dashboard design.', parentId: folderId, type: 'file', icon: 'Lightbulb', updatedAt: now, lastVisitedAt: null },
      { id: ids[11], name: 'Reading Notes', content: 'Finished Clean Code chapter on functions. Software engineering principles apply to our frontend components and backend architecture. Good patterns for the team to follow.', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: null },
    ],
    activeFileId: ids[0],
  }
}

// ─── Reactive state (module-level singleton so all components share one store) ─

const saved = loadFromStorage()
const state = reactive(saved || createDefaultData())

// ─── Index all existing files into FTS on startup ────────────────────────────
state.items
  .filter(i => i.type === 'file')
  .forEach(item => {
    indexNote(item.id, { title: item.name, content: item.content || '' }).catch(() => {})
  })

// TODO: Remove this watch block once backend is connected. Currently it auto-saves
// the entire state to localStorage on every change. With a real backend, each
// individual function below will call its own API endpoint instead.
watch(state, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}, { deep: true })

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
   * No API call needed for activeFileId — this is purely local UI state.
   *
   * TODO — Backend (optional): PATCH /api/notes/:id
   * Request body: { lastVisitedAt: string } — useful if you want cross-device
   * "recently visited" to sync. Otherwise keep client-side only.
   */
  function setActiveFile(id) {
    state.activeFileId = id
    const item = state.items.find(i => i.id === id && i.type === 'file')
    if (item) item.lastVisitedAt = new Date().toISOString()
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
   * TODO — Backend: POST /api/notes
   * Request body:  { name: "Untitled", content: "", parentId: string | null, type: "file" }
   * Expected response: the created Item object (including server-generated id and updatedAt)
   * On success: push the returned item into state.items and set state.activeFileId
   */
  function createFile(parentId = null) {
    const id = generateId()
    const name = 'Untitled'
    state.items.push({
      id, name, content: '', parentId, type: 'file',
      icon: 'FileText', updatedAt: new Date().toISOString(), lastVisitedAt: null,
    })
    state.activeFileId = id
    indexNote(id, { title: name, content: '' }).catch(err => {
      console.warn('Failed to index new note:', err.message)
    })
    return id
  }

  /**
   * Creates a new folder in the sidebar tree.
   *
   * TODO — Backend: POST /api/notes
   * Request body:  { name: "New Folder", parentId: string | null, type: "folder" }
   * Expected response: the created Item object
   * On success: push the returned item into state.items
   */
  function createFolder(parentId = null) {
    const id = generateId()
    state.items.push({
      id, name: 'New Folder', parentId, type: 'folder',
      updatedAt: new Date().toISOString(),
    })
    return id
  }

  /**
   * Saves the markdown content of a note. Called on every keystroke (debounced
   * by Vue's reactivity). Consider debouncing the API call (e.g. 500ms) to avoid
   * hammering the server on every keypress.
   *
   * TODO — Backend: PATCH /api/notes/:id
   * Request body:  { content: string, updatedAt: string }
   * Expected response: { updatedAt: string } (return updated timestamp from server)
   * On success: update item.updatedAt with the server-returned value
   */
  function updateFileContent(id, content) {
    const item = state.items.find(i => i.id === id)
    if (item && item.type === 'file') {
      item.content = content
      item.updatedAt = new Date().toISOString()
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
    // Remove from FTS index (fire-and-forget)
    const item = state.items.find(i => i.id === id)
    if (item && item.type === 'file') {
      deleteNoteIndex(id).catch(err => {
        console.warn('Failed to remove note from index:', err.message)
      })
    }
    // Recursively delete children client-side (remove this if backend cascades)
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

  return {
    state,
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
  }
}
