<template>
    <div class="custom-datepicker" :class="flexRow ? 'flex-row items-center' : 'flex-col'">
        <span class="text-primary">{{ label }}
        <span v-if="isRequired" class="required-icon">*</span>
      </span>
        <DatePicker
        ref="dp"
        v-model="date"
        showIcon
        placeholder="Chọn ngày"
        locale="vi"
        dateFormat="dd/mm/yy"
        :tabindex="tabindex"
         fluid 
         iconDisplay="input"
        @update:modelValue="emit('update:modelValue', $event)"
         :class="[!!size && size]"
      >
        <template #inputicon>
            <span class="icon calendar-icon"></span>
        </template>
      </DatePicker>

      <small v-if="isRequired || error_message" :class="['error-text', error_message && 'show']">{{
        error_message
      }}</small>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import DatePicker from 'primevue/datepicker'
  import { onMounted } from 'vue'
  
  const dp = ref(null)

//#region Props
const props = defineProps({
  tabindex: Number,
  size: {
    type: String,
    default: 'medium',
  },
  label: String,
  isRequired: Boolean,
  error_message: String,
  flexRow: Boolean,
  modelValue: {
    type: Date,
    default: () => new Date()
  }
})
//#endregion Props

//#region Emits
const emit = defineEmits(['update:modelValue'])

const date = ref(props.modelValue || new Date())
onMounted(() => {
  emit('update:modelValue', date.value)
})
  //#endregion Emits
  </script>
  
  <style>
  .custom-datepicker {
    display: flex;
    gap: 8px;
  }
  .p-datepicker-header {
    padding: 0 !important;
    border: none !important;
    padding-left: 12px !important;
  }
  .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-input{
    padding: 0 14px 0 14px;
    width: 100%;
    outline: none;
    border: 1px solid var(--input-border-color) !important;
    border-radius: 2.5px;
    font-size: 13px;
    color: var(--text-color);
  }
  </style>
  