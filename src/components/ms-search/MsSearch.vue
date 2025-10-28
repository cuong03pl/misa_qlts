<template>
  <div :class="[!!size && size]" class="filter-search flex items-center gap-8">
    <span class="search_icon">
      <span class="icon search-icon"></span>
    </span>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="search_input text-primary"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
//#region Props
defineProps({
  placeholder: {
    type: String,
    default: 'Tìm kiếm',
  },
  modelValue: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'medium',
  },
})
//#endregion Props

//#region Emits
const emit = defineEmits(['update:modelValue'])
//#endregion Emits
</script>

<style>
/* filter */
.filter-search {
  width: var(--search-width);
  border-radius: 2.5px;
  border: 1px solid var(--input-border-color);
  background: var(--white-color);
  padding: 6px 7px;
}

.filter-search .search_icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-search .search_input {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: 13px;
  font-style: italic;

}
</style>
