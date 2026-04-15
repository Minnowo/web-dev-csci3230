<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useAuth } from "./composables/useAuth.js";

const route = useRoute();
const hideNavbar = computed(() => route.meta?.hideNavbar);

// Rehydrate user info from existing token on page load
const { fetchUser } = useAuth();
fetchUser();
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Navbar v-if="!hideNavbar" />
    <div class="flex-1 overflow-auto">
      <RouterView />
    </div>
  </div>
</template>
