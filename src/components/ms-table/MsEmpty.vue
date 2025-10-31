<template>
  <div class="empty-component">
    <img src="@/assets/img/empty.jpg" alt="" />
    <span>{{ message }}</span>
  </div>
</template>
  
<script setup>
defineProps({
  message: {
    type: String,
    default: 'Danh sách trống',
  },
})
</script>
  
  <style>
.empty-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  user-select: none;
}
</style>
  