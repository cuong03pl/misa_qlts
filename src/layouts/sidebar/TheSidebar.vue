<template>
  <div :class="['side-bar flex flex-col justify-between', !isShow && 'collapsed']">
    <div class="">
      <div class="logo flex items-center gap-12 px-6 py-3 " >
        <span class="icon logo-icon"></span>
        <span class="logo-text">{{ t('sidebar.title') }}</span>
      </div>
      <ul class="side-bar-list flex flex-col gap-4">
        <li
          v-for="item in sidebar_data"
          :key="item.id"
          class="flex gap-12 items-center px-4 py-2 cursor-pointer hover:bg-gray-700 rounded-sm transition"
        >
          <span :class="`icon ${item.icon}`"></span>
          <span class="label text-white">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <ms-button size="large" type="toggle" @click="handleToggle">
        <span class="icon toggle-icon"></span>
    </ms-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getSidebarData } from '@/constants/sidebar_data'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//#region State
const isShow = ref(true)
const sidebar_data = computed(() => getSidebarData(t))
//#endregion State

//#region Methods
/**
 * Hàm xử lý thu gọn sidebar
 * createdby: hkc
 */
const handleToggle = () => {
  isShow.value = !isShow.value
}
//#endregion Methods
</script>

<style>
.side-bar {
  background: var(--sidebar-bg);
  width: 250px;
  transition: all 0.3s ease;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--sidebar-text-hover);
  min-width: 120px;
}

.side-bar ul {
  border-radius: 4px;
  padding: 16px 12px;
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

.side-bar ul li:hover .icon{
  background: var(--sidebar-text-hover);
}

.side-bar.collapsed {
  width: 56px;
  transition: all 0.3s ease;
}

.side-bar.collapsed .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  
}
.side-bar.collapsed .label, .side-bar.collapsed .logo-text {
  display: none;
  transition: all 0.3s ease;
}

.side-bar.collapsed ul {
  align-items: center;
}

.side-bar.collapsed ul li {
  align-items: center;
}
</style>
