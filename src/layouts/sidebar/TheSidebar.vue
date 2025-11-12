<template>
  <div :class="['side-bar flex flex-col justify-between', !isShow && 'collapsed']">
    <div class="">
      <div class="logo flex items-center gap-12 px-6 py-3">
        <span class="icon logo-icon"></span>
        <span class="logo-text">{{ t('sidebar.title') }}</span>
      </div>
      <ul class="side-bar-list flex flex-col">
        <li
          v-for="item in sidebar_data"
          :key="item.id"
          class="flex items-center justify-between px-4 py-2 cursor-pointer rounded-sm transition sidebar-item"
        >
          <div class="flex gap-12 items-center">
            <span :class="`icon ${item.icon}`"></span>
            <span :class="`icon active-icon ${item.active_icon}`"></span>
            <span class="label text-white">{{ item.title }}</span>
          </div>
          <span v-if="item.hasDropdown" class="arrow-icon arrow-down-icon"></span>
        </li>
      </ul>
    </div>
    <ms-button size="large" type="toggle" @click="handleToggle">
      <span v-if="isShow" class="icon toggle-icon-close"></span>
      <span v-else class="icon toggle-icon-open"></span>
    </ms-button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getSidebarData } from '@/constants/sidebarData'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//#region State
const isShow = ref(true)
const sidebar_data = computed(() => getSidebarData(t))
const MOBILE_BREAKPOINT = 1024
//#endregion State

//#region Methods
/**
 * Hàm xử lý thu gọn sidebar
 * createdby: hkc
 */
const handleToggle = () => {
  isShow.value = !isShow.value
}

/**
 * Hàm kiểm tra kích thước màn hình và tự động thu gọn sidebar
 * createdby: hkc
 */
const checkScreenSize = () => {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    isShow.value = false
  } else {
    isShow.value = true
  }
}
//#endregion Methods

//#region Lifecycle
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
//#endregion Lifecycle
</script>

<style scoped>
.side-bar {
  background: var(--sidebar-bg);
  /* width: 200px; */
  transition: all 0.3s ease;
}
.logo {
  height: 50px;
  padding: 11px 20px 4px 20px !important;
}
.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--sidebar-text-hover);
  min-width: 120px;
}

.side-bar ul {
  border-radius: 4px;
  padding: 15px 12px;
}
.side-bar ul li .label {
  min-width: 100px;
  color: var(--sidebar-text-primary);
}

.side-bar ul li:hover {
  cursor: pointer;
  background: var(--sidebar-bg-hover);
}

.side-bar ul li:hover .label {
  color: var(--sidebar-text-hover);
}

.side-bar ul li:hover .icon {
  background: var(--sidebar-text-hover);
}
.side-bar ul li:hover .arrow-icon {
  background: var(--sidebar-text-hover);
}

.side-bar.collapsed {
  width: var(--sidebar-width-collapsed);
  transition: all 0.3s ease;
}

.side-bar.collapsed .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 0 4px 0 !important;
  width: 100%;
}
.side-bar.collapsed .label,
.side-bar.collapsed .logo-text,
.side-bar.collapsed .arrow-icon {
  display: none;
  transition: all 0.3s ease;
}

.side-bar.collapsed ul {
  align-items: center;
}

.side-bar.collapsed ul li {
  align-items: center;
  padding: 8px 10px !important;
}
.active-icon {
  display: none;
}
.collapsed .sidebar-item:hover {
  border-radius: 6px;
}
.sidebar-item:hover .icon {
  display: none;
}

.sidebar-item:hover .active-icon {
  display: block;
}
.collapsed .ms-button-toggle {
  padding-left: 0 !important;
  padding-right: 0 !important;
  justify-content: center;
}
</style>
