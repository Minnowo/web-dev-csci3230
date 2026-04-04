<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const hideNavbar = computed(() => route.meta?.hideNavbar)
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Navbar v-if="!hideNavbar" />
    <div class="flex-1 overflow-auto">
      <RouterView />
    </div>
  </div>
</template>
