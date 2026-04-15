<template>
  <div class="auth-field">
    <label class="field-label">{{ label }}</label>
    <div class="field-wrap" :class="{ error: !!error }">
      <component v-if="icon" :is="icon" class="field-icon w-4 h-4" />
      <input
        class="field-input"
        :class="{ 'has-icon': !!icon }"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown.enter="$emit('submit')"
      />
      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-btn"
        @click="showPassword = !showPassword"
      >
        <EyeOff v-if="showPassword" class="w-4 h-4" />
        <Eye v-else class="w-4 h-4" />
      </button>
    </div>
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

const props = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  icon: { type: Object, default: null },
  error: { type: String, default: "" },
  autocomplete: { type: String, default: "off" },
});

defineEmits(["update:modelValue", "submit"]);

const showPassword = ref(false);
const inputType = computed(() => {
  if (props.type === "password")
    return showPassword.value ? "text" : "password";
  return props.type;
});
</script>

<style scoped>
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dim);
}
.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
  pointer-events: none;
  flex-shrink: 0;
}
.field-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.field-input.has-icon {
  padding-left: 36px;
}
.field-input::placeholder {
  color: var(--text-muted);
}
.field-input:focus {
  border-color: var(--label-to);
}
.field-wrap.error .field-input {
  border-color: #f87171;
}
.toggle-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: color 0.12s;
}
.toggle-btn:hover {
  color: var(--text);
}
.field-error {
  font-size: 12px;
  color: #f87171;
  margin: 0;
}
</style>
