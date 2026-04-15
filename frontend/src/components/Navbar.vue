<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Pencil,
  FileText,
  Sun,
  Moon,
  User,
  BarChart2,
  ChevronDown,
  LogOut,
} from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { isDark, toggle } = useTheme();
const { isAuthenticated, user, logout } = useAuth();
const router = useRouter();

const insightsOpen = ref(false);
const insightsRef = ref(null);
const accountOpen = ref(false);
const accountRef = ref(null);

function closeInsights() {
  insightsOpen.value = false;
}

function handleLogout() {
  logout();
  accountOpen.value = false;
  router.push("/login");
}

function handleClickOutside(e) {
  if (insightsRef.value && !insightsRef.value.contains(e.target))
    insightsOpen.value = false;
  if (accountRef.value && !accountRef.value.contains(e.target))
    accountOpen.value = false;
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <nav
    class="flex items-center gap-1 px-4 h-12 bg-c-nav-bg border-b border-c-nav-border text-sm text-c-text-dim transition-colors"
  >
    <RouterLink
      to="/"
      class="font-semibold text-c-text mr-3 hover:opacity-80 transition-opacity cursor-pointer"
      >GraphNotes</RouterLink
    >

    <RouterLink to="/editor" custom v-slot="{ navigate, isActive }">
      <button
        @click="navigate"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-c-border transition-colors cursor-pointer"
        :class="isActive ? 'text-c-text' : 'hover:text-c-text'"
      >
        <Pencil class="w-4 h-4" /> Editor
      </button>
    </RouterLink>

    <!-- Insights dropdown -->
    <div class="relative" ref="insightsRef">
      <button
        @click="insightsOpen = !insightsOpen"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
      >
        <BarChart2 class="w-4 h-4" /> Insights
        <ChevronDown class="w-3 h-3 ml-0.5" />
      </button>

      <div
        v-if="insightsOpen"
        class="absolute top-full left-0 mt-1 w-36 bg-c-nav-bg border border-c-nav-border rounded-md shadow-lg z-50 py-1"
      >
        <RouterLink
          to="/graph"
          @click="closeInsights"
          class="flex items-center gap-2 px-3 py-2 text-sm text-c-text-dim hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
        >
          Graph
        </RouterLink>
        <RouterLink
          to="/calendar"
          @click="closeInsights"
          class="flex items-center gap-2 px-3 py-2 text-sm text-c-text-dim hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
        >
          Calendar
        </RouterLink>
      </div>
    </div>

    <div class="flex-1" />

    <button
      class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
      title="Toggle theme"
      @click="toggle"
    >
      <Sun v-if="isDark" class="w-4 h-4" />
      <Moon v-else class="w-4 h-4" />
    </button>

    <!-- Account dropdown -->
    <div class="relative" ref="accountRef">
      <button
        @click="accountOpen = !accountOpen"
        class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-c-border hover:text-c-text transition-colors cursor-pointer"
        title="Account"
      >
        <User class="w-4 h-4" />
      </button>

      <div
        v-if="accountOpen"
        class="absolute top-full right-0 mt-1 w-44 bg-c-nav-bg border border-c-nav-border rounded-md shadow-lg z-50 py-1"
      >
        <!-- Greeting -->
        <div
          class="px-3 py-2 text-xs text-c-text-dim border-b border-c-nav-border"
        >
          Hi,
          <span class="font-semibold text-c-text">{{
            user?.NAME ?? "there"
          }}</span>
        </div>

        <!-- Logout -->
        <button
          @click="handleLogout"
          class="flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors cursor-pointer text-red-400 hover:bg-c-border hover:text-red-400"
        >
          <LogOut class="w-4 h-4" /> Log out
        </button>
      </div>
    </div>
  </nav>
</template>
