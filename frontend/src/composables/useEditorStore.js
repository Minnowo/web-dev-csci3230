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

const STORAGE_KEY = 'graphnotes-vault'

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
  const file1Id = generateId()
  const file2Id = generateId()
  const now = new Date().toISOString()

  return {
    items: [
      { id: file1Id, name: 'test text', content: 'hello world', parentId: null, type: 'file', icon: 'FileText', updatedAt: now, lastVisitedAt: now },
      { id: folderId, name: 'New Folder', parentId: null, type: 'folder', updatedAt: now },
      { id: file2Id, name: 'text in folder', content: '# this is an h1', parentId: folderId, type: 'file', icon: 'Lightbulb', updatedAt: now, lastVisitedAt: null },
    ],
    activeFileId: file1Id,
  }
}

// ─── Reactive state (module-level singleton so all components share one store) ─

const saved = loadFromStorage()
const state = reactive(saved || createDefaultData())

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
