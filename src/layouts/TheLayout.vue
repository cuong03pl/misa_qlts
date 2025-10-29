<script setup>
import TheHeader from './header/TheHeader.vue'
import TheSidebar from './sidebar/TheSidebar.vue'
</script>
<template>
  <div class="container">
      <!-- side bar -->
      <the-sidebar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Header -->
        <the-header />
        <!-- content -->
        <router-view />
      </div>
  </div>
</template>
<style>
.container {
  display: flex;
  height: 100vh;
}
</style>
