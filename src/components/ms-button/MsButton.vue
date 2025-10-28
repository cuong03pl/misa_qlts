<template>
  <button
    @click="emit('click')"
    :class="[
      'ms-btn',
      `ms-button-${type}`,
      isOnlyIcon && 'ms-button-only-icon',
      !!size && size,
      disabled && 'disabled',
    ]"
  >
    <slot name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>

<script setup>
//#region Props
defineProps({
  isOnlyIcon: Boolean,
  size: String,
  disabled: Boolean,
  type: String,
})
//#endregion Props

//#region Emits
const emit = defineEmits(['click'])
//#endregion Emits
</script>

<style>
/* base */
.ms-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.014em;
}

/* --- Color  --- */
.ms-button-primary {
  background: var(--btn-primary);
  color: #fff;
  min-width: 80px;
  padding: 0 16px;
}

.ms-button-secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
  min-width: 80px;
  padding: 0 16px;
}

.ms-button-delete,
.btn-confirm-delete {
  background: #d32f2f;
  color: #fff;
  min-width: 80px;
}

.ms-button-toggle {
  color: #fff;
  gap: 4px;
  justify-content: end;
  border-top: 1px #ccc solid;
  border-radius: 0;
  padding: 20px 12px;
  /* padding: 12px 16px; */
}

/* --- Special styles --- */
.ms-button-only-icon {
  border: 1px solid #cccccc87;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: 36px;
  width: 36px;
}

/* combo button */
.ms-button-combo {
  background: var(--btn-primary);
  color: #fff;
  padding-left: 12px;
}
.ms-button-combo div {
  border-left: 1px solid #ccc;
  padding: 0 12px;
  height: 100%;
}
.ms-button-combo span {
  padding: 0 16px 0 4px;
}
.ms-button-combo i {
  /* font-size: 20px; */
}

/* new */
.ms-button-link {
  color: #fff;
}
.ms-button-one-icon {
  gap: 4px;
  padding: 0 16px 0 12px;
  min-width: 80px;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.56;
}
</style>
