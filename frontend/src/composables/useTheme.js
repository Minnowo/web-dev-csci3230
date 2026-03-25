import { ref, watchEffect } from 'vue'

const isDark = ref(true)

watchEffect(() => {
  document.documentElement.classList.toggle('light', !isDark.value)
})

export function useTheme() {
  const toggle = () => { isDark.value = !isDark.value }
  return { isDark, toggle }
}
