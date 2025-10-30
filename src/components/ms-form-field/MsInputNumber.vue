
<template>
  <div class="form-input flex flex-1" :class="flexRow ? 'flex-row items-center' : 'flex-col'">
    <span class="text-primary"
      >{{ label }}
      <span v-if="isRequired" class="required-icon">*</span>
    </span>
    <InputNumber
      :showButtons="hasButton"
      :tabindex="tabindex"
      :class="[!!size && size, error_message && 'input-number-error']"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :modelValue="modelValue"
      :disabled="disabled"
      @input="(val) => emit('update:modelValue', val.value)"
    >
      <template #incrementicon>
        <span class="icon up-icon"></span>
      </template>
      <template #decrementicon>
        <span class="icon dropdown-icon"></span>
      </template>
    </InputNumber>
    <small v-if="isRequired" :class="['error-text', error_message && 'show']">{{
      error_message
    }}</small>
  </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber'
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
  modelValue: [String, Number],
  error_message: String,
  flexRow: Boolean,
  disabled: Boolean,
  tabindex: Number,
  hasButton: Boolean,
})
//#endregion Props

//#region Emits
const emit = defineEmits(['update:modelValue'])
//#endregion Emits
</script>

<style>
.form-input {
  gap: 8px;
}
.form-input input {
  padding: 0 14px 0 14px;
  width: 100%;
  outline: none;
  border: 1px solid var(--input-border-color) !important;
  border-radius: 2.5px;
  font-size: 13px;
  color: var(--text-color);
}
.p-inputtext {
  border: 1px solid var(--input-border-color) !important;
}
.input-number-error .p-inputtext {
  border: 1px solid red !important;
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
button.p-inputnumber-button.p-inputnumber-decrement-button {
  width: 32px !important;
}
button.p-inputnumber-button.p-inputnumber-increment-button {
  width: 32px !important;
}

.p-inputnumber-stacked .p-inputnumber-button-group {
  height: 20px !important;
  inset-block-start: 8px !important;
}

.p-inputnumber-button:not(:disabled):hover,
.p-inputnumber-button:not(:disabled):hover {
  background: none !important;
}

.p-inputtext:enabled:hover,
.p-inputtext:enabled:focus {
  border: 1px solid var(--btn-primary) !important;
  outline: none;
}
</style>
