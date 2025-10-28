<script setup>
import TheHeader from './header/TheHeader.vue'
import TheSidebar from './sidebar/TheSidebar.vue'
</script>
<template>
  <div class="container">
    <div class="flex-1 flex">
      <!-- side bar -->
      <the-sidebar />
      <div class="">
        <!-- Header -->
        <the-header />
        <!-- content -->
        <router-view />
      </div>
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
