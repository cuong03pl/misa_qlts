<template>
  <div class="select-list flex flex-col justify-center">
    <div v-if="label" class="text-primary">
      {{ label }}
      <span v-if="isRequired" class="required-icon">*</span>
    </div>
    <Select
      :tabindex="tabindex"
      :options="dataOptions"
      :optionLabel="optionLabel"
      :modelValue="modelValue"
      :class="[isFilter && 'filter', !!size && size]"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center gap-9">
          <span v-if="hasLeftIcon" class="icon filter-icon"></span>
          <span class="text-primary">{{ slotProps.value[optionLabel] }}</span>
        </div>
        <div v-else class="flex items-center gap-9">
          <span v-if="hasLeftIcon" class="icon filter-icon"></span>
          <span class="text-primary">{{ placeholder }}</span>
        </div>
      </template>
      <template #dropdownicon>
        <span class="icon dropdown-icon"></span>
      </template>
    </Select>
    <small v-if="isRequired" :class="['error-text', error_message && 'show']">
      {{ error_message }}
    </small>
  </div>
</template>
  
  <script setup>
import Select from 'primevue/select'

//#region Props
defineProps({
  isFilter: Boolean,
  label: String,
  size: {
    type: String,
    default: 'medium',
  },
  isRequired: Boolean,
  error_message: String,
  placeholder: String,
  hasLeftIcon: Boolean,
  modelValue: [String, Number],
  tabindex: Number,
  dataOptions: Array,
  optionLabel: String,
  optionValue: String,
  isFilled: Boolean,
})
//#endregion Props

//#region Emits
const emit = defineEmits(['update:modelValue'])
//#endregion Emits
</script>
  
  <style>
.p-select {
  width: 100%;
  border: 1px solid var(--input-border-color) !important;
  border-radius: 2.5px !important;
  font-size: 13px !important;
}

.p-select-label {
  display: flex !important;
  align-items: center !important;
  padding: 6px !important;
}

.p-select-dropdown {
  width: 32px !important;
}
.select-list {
  gap: 8px;
}
.select-list select {
  height: var(--input-form-height);
  padding: 0 8px 0 12px;
  display: block;
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-color);
}
.filter {
  width: 219px;
}
.p-select:not(.filter) {
  font-style: italic;
  padding-left: 14px;
}
.p-select:not(.filter) .p-select-label {
  padding: 0 !important;
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
</style>
