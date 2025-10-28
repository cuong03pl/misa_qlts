<template>
     <div class="select-list flex flex-col justify-center ">
        <div v-if="label" class="text-primary">{{ label }}</div>
        <Select v-model="selectedCity" :options="cities" optionLabel="name"  class="w-full md:w-56" >
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center gap-9">
                    <span class="icon filter-icon"></span>
                    <span class="text-primary">{{ slotProps.value.name }}</span>
                </div>
                <div v-else class="flex items-center  gap-9">
                    <span class="icon filter-icon"></span>
                    <span class="text-primary">{{ placeholder }}</span>
                </div>
            </template>
            <template #dropdownicon>
                <span class="icon dropdown-icon"></span>
            </template>
        </Select>
    </div>
  </template>
  
  <script setup>
  
import Select from 'primevue/select';
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
  //#region Props
  defineProps({
    label: String,
    size: String,
    isRequired: Boolean,
    error_message: String,
    placeholder: String,
    modelValue: [String, Number],
  })
  //#endregion Props
  
  //#region Emits
  //#endregion Emits
  </script>
  
  <style>
  .p-select {
    width: 219px;
    border: 1px solid var(--input-border-color) !important;
    height: 35px !important;
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
  
  select:focus {
    /* border: 1px solid var(--toast-success); */
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
  </style>
