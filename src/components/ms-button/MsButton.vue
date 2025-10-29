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
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.014em;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .16);
}

/* --- Color  --- */
.ms-button-primary {
  background: var(--btn-primary);
  color: #fff;
  min-width: 110px;
  padding: 0 16px;
}
.ms-button-primary:hover:not(.disabled) {
  background: var(--btn-primary-hover);
}

.ms-button-secondary {
  color: #333;
 background-color: var(--white-color);
  min-width: 110px;
  padding: 0 16px;
  box-shadow: none;
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
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 8px; */
  background-color: #ffffff;
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

/* new */
.ms-button-link {
  color: #fff;
}
.ms-button-one-icon {
  background: var(--btn-primary);
  color: var(--white-color);
  width: 110px;
  gap: 4px;
  /* padding: 0 14px 0 12px; */
}

.ms-button-one-icon:hover:not(.disabled) {
  background: var(--btn-primary-hover);
}

.disabled {
  cursor: not-allowed;
  opacity: 0.56;
}
</style>
