<template>
  <div class="form-input flex flex-1" :class="flexRow ? 'flex-row items-center' : 'flex-col'">
    <span class="text-primary"
      >{{ label }}
      <span v-if="isRequired" class="required-icon">*</span>
    </span>
    <input
      ref="inputRef"
      :tabindex="tabindex"
      :class="[!!size && size, error_message && 'input-error']"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <small v-if="isRequired" :class="['error-text', error_message && 'show']">{{
      error_message
    }}</small>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'

//#region Props
defineProps({
  label: String,
  type: String,
  name: String,
  placeholder: String,
  isRequired: Boolean,
  size: {
    type: String,
    default: 'medium',
  },
  modelValue: String,
  error_message: String,
  flexRow: Boolean,
  disabled: Boolean,
  tabindex: Number,
})
//#endregion Props

//#region Emits
const emit = defineEmits(['update:modelValue'])
//#endregion Emits

//#region Expose
const inputRef = ref(null)

const focus = () => {
  inputRef.value?.focus()
}

defineExpose({
  focus,
  inputRef,
})
//#endregion Expose
</script>
  
  <style scoped>
/* --- Size  --- */
.input-error {
  border: 1px solid red !important;
}
.form-input {
  gap: 8px;
}
.form-input input {
  padding: 0 14px 0 14px;
  width: 100%;
  outline: none;
  border: 1px solid var(--input-border-color);
  border-radius: 2.5px;
  font-size: 14px;
  color: var(--text-color);
}

.form-input input::placeholder {
  font-style: italic;
  color: var(--text-color);
  opacity: 0.5;
}

/* focus */
input:focus:not(:disabled),
input:hover:not(:disabled) {
  border: 1px solid var(--btn-primary) !important;
  outline: none;
}

input.readonly {
}

.error-text {
  color: red;
  font-size: 13px;
  min-height: 16px;
  display: none;
}
.error-text.show {
  display: block;
}
.required-icon {
  color: red;
}

.form-input input:disabled {
  background-color: #00000014;
  cursor: not-allowed;
}
</style>
  