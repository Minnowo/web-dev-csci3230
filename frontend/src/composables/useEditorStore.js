import { reactive, computed, watch } from 'vue'

const STORAGE_KEY = 'graphnotes-vault'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return null
}

function createDefaultData() {
  const folderId = generateId()
  const file1Id = generateId()
  const file2Id = generateId()
  const now = new Date().toISOString()

  return {
    items: [
      { id: file1Id, name: 'test text', content: 'hello world', parentId: null, type: 'file', updatedAt: now },
      { id: folderId, name: 'New Folder', parentId: null, type: 'folder', updatedAt: now },
      { id: file2Id, name: 'text in folder', content: '# this is an h1', parentId: folderId, type: 'file', updatedAt: now },
    ],
    activeFileId: file1Id,
  }
}

const saved = loadFromStorage()
const state = reactive(saved || createDefaultData())

watch(state, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}, { deep: true })

export function useEditorStore() {
  const activeFile = computed(() =>
    state.items.find(i => i.id === state.activeFileId && i.type === 'file') || null
  )

  const rootItems = computed(() =>
    state.items.filter(i => i.parentId === null)
  )

  function getChildren(parentId) {
    return state.items.filter(i => i.parentId === parentId)
  }

  function setActiveFile(id) {
    state.activeFileId = id
  }

  function createFile(parentId = null) {
    const id = generateId()
    const name = 'Untitled'
    state.items.push({
      id, name, content: '', parentId, type: 'file',
      updatedAt: new Date().toISOString(),
    })
    state.activeFileId = id
    return id
  }

  function createFolder(parentId = null) {
    const id = generateId()
    state.items.push({
      id, name: 'New Folder', parentId, type: 'folder',
      updatedAt: new Date().toISOString(),
    })
    return id
  }

  function updateFileContent(id, content) {
    const item = state.items.find(i => i.id === id)
    if (item && item.type === 'file') {
      item.content = content
      item.updatedAt = new Date().toISOString()
    }
  }

  function renameItem(id, newName) {
    const item = state.items.find(i => i.id === id)
    if (item) {
      item.name = newName
      item.updatedAt = new Date().toISOString()
    }
  }

  function deleteItem(id) {
    // Recursively delete children if folder
    const children = state.items.filter(i => i.parentId === id)
    children.forEach(c => deleteItem(c.id))
    const idx = state.items.findIndex(i => i.id === id)
    if (idx !== -1) state.items.splice(idx, 1)
    if (state.activeFileId === id) {
      const firstFile = state.items.find(i => i.type === 'file')
      state.activeFileId = firstFile ? firstFile.id : null
    }
  }

  const fileCount = computed(() => state.items.filter(i => i.type === 'file').length)

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
    searchItems,
  }
}
