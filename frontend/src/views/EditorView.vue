<template>
  <EditorLayout />
</template>

<script setup>
import { onMounted } from 'vue'
import EditorLayout from '../components/editor/EditorLayout.vue'
import { useEditorStore } from '../composables/useEditorStore.js'

const { init } = useEditorStore()
onMounted(init)
</script>
