<template>
    <div class="header flex justify-between items-center">
      <!-- Header left -->
      <div class="flex items-center h-full gap-24">
        <div class="logo flex items-center gap-24">
          <span class="text text-primary">{{ t('header.title') }}</span>
        </div>
      </div>
      <!-- Header right -->
      <div class="flex gap-12 header-right items-center">
        <span class="text">{{ t('header.link') }}</span>
        <div class="year-selector">
          <span class="year-selector-text">Năm</span>
          <span class="year-selector-number">2021</span>
          <div class="flex flex-col gap-2">
            <span class="icon up-icon"></span>
            <span class="icon dropdown-icon"></span>

          </div>
        </div>
        <span class="icon notification-icon"> </span>
        <span class="icon menu-icon"> </span>
        <span class="icon question-icon"> </span>
        <div class="flex gap-4 items-center">
            <span class="icon avatar-icon"> </span>
            <span class="icon dropdown-icon"> </span>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  </script>
  
  <style>
  /* Header */
  .header {
    height: var(--header-height);
    padding: 4px 12px;

  }
  
  .icon {
    display: block;
  }
  /* left */
  .menu {
    font-size: 20px;
    padding: 2px;
  }
  
  .logo .text {
    font-size: 20px;
    font-weight: 700;
  }
  

  /* right */
  .header-right .text {
    font-weight: 400;
    font-size: 14px;
    color: var(--text-color);
    line-height: 18px;
  }
  
  .year-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--year-selector-bg);
    padding: 8px 4px 8px 12px;
    border-radius: 4px;
  }
  .year-selector-text, .year-selector-number {
    font-size: 14px;
    font-weight: 400;
    color: var(--text-color);
    line-height: 18px;
  }
  .icon {
    display: block;
  }

  
  </style>
  