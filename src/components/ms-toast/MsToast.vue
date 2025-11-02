<template>
  <div class="toast" :class="toastClass">
    <div class="flex items-center gap-8">
      <div class="flex gap-6">
        <span class="icon" :class="icon"></span>
        <p class="title font-semibold">{{ title }}</p>
        <p class="message text-sm flex items-center">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { computed } from 'vue'
//#region Props
const props = defineProps({
  type: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  icon: { type: String, required: true },
})
//#endregion Props

//#region Computed
const toastClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'bg-gray-100'
  }
})

//#endregion Computed
</script>
  
  <style scoped>
.toast {
  min-width: 450px;
  max-width: 650px;
}
.success .icon,
.success .title {
  color: var(--toast-success);
}

.error .icon,
.error .title {
  color: var(--toast-error);
}

.warning .icon,
.warning .title {
  color: var(--toast-warning);
}
.info .icon,
.info .title {
  color: var(--toast-info);
}
.message {
  color: var(--text-color);
}
</style>
  