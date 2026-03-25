<template>
  <nav class="flex items-center gap-1 px-4 h-12 bg-[#0f1117] border-b border-white/10 text-sm text-white/60">
    <!-- Brand -->
    <span class="font-semibold text-white mr-3">Notes</span>

    <!-- Nav links -->
    <button class="nav-link">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z"/>
      </svg>
      Editor
    </button>

    <button class="nav-link">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/>
        <line x1="7" y1="12" x2="17" y2="6" stroke-linecap="round"/>
        <line x1="7" y1="12" x2="17" y2="18" stroke-linecap="round"/>
      </svg>
      Graph View
    </button>

    <button class="nav-link">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <line x1="8" y1="9" x2="16" y2="9" stroke-linecap="round"/>
        <line x1="8" y1="13" x2="16" y2="13" stroke-linecap="round"/>
        <line x1="8" y1="17" x2="12" y2="17" stroke-linecap="round"/>
      </svg>
      Notes
    </button>

    <!-- Spacer -->
    <div class="flex-1" />

    <!-- Icon buttons -->
    <button class="icon-btn" title="Toggle theme">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="4" stroke-linecap="round"/>
        <line x1="12" y1="20" x2="12" y2="22" stroke-linecap="round"/>
        <line x1="2" y1="12" x2="4" y2="12" stroke-linecap="round"/>
        <line x1="20" y1="12" x2="22" y2="12" stroke-linecap="round"/>
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke-linecap="round"/>
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke-linecap="round"/>
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke-linecap="round"/>
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke-linecap="round"/>
      </svg>
    </button>

    <button class="icon-btn" title="Account">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <circle cx="12" cy="8" r="4"/>
        <path stroke-linecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 hover:text-white/90 transition-colors cursor-pointer;
}
.icon-btn {
  @apply flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 hover:text-white/90 transition-colors cursor-pointer;
}
</style>
