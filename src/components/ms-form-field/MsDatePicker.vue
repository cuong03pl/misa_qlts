<template>
  <div class="custom-datepicker" :class="flexRow ? 'flex-row items-center' : 'flex-col'">
    <span class="text-primary"
      >{{ label }}
      <span v-if="isRequired" class="required-icon">*</span>
    </span>
    <DatePicker
      dateFormat="dd/mm/yy"
      ref="dp"
      v-model="date"
      showIcon
      :placeholder="t('common.selectDate')"
      fluid
      iconDisplay="input"
      @update:modelValue="emit('update:modelValue', $event)"
      :class="[!!size && size, error_message && 'date-error']"
      :pt="{
        pcInputText: { root: { tabindex: tabindex } },
      }"
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
import { useI18n } from 'vue-i18n'
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
    default: () => new Date(),
  },
})
//#endregion Props
//#region State
const { t } = useI18n()
const dp = ref(null)
const date = ref(props.modelValue || new Date())

//#endregion State

//#region Emits
const emit = defineEmits(['update:modelValue'])
//#endregion Emits

// Xử lý truyền modelValue ra ngoài
onMounted(() => {
  emit('update:modelValue', date.value)
})
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
.p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-input {
  padding: 0 14px 0 14px;
  width: 100%;
  outline: none;
  border: 1px solid var(--input-border-color) !important;
  border-radius: 2.5px;
  font-size: 13px;
  color: var(--text-color);
}
.date-error {
  border: 1px solid red !important;
}
</style>
  