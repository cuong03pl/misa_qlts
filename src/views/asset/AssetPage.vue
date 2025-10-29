<template>
    <!-- filter -->
    <div class=" filter-controls flex justify-between items-center">
      <div class=" flex items-center gap-11">
       <ms-search placeholder="Tìm kiếm tài sản" />
        <ms-select isFilter hasLeftIcon placeholder="Loại tài sản" />
        <ms-select isFilter hasLeftIcon placeholder="Bộ phận sử dụng" />
      </div>
      <div class=" flex items-center gap-10">
        <ms-button @click="handleOpenModal" type="one-icon" size="large">
          <template #left-icon>
            <span class="icon plus-icon"></span>
          </template>
          <span class="text-white">Thêm tài sản</span>
        </ms-button>
        <ms-button type="only-icon" size="large">
          <template #left-icon>
            <span class="icon excel-icon"></span>
          </template>
        </ms-button>
        <ms-button type="only-icon" size="large">
          <template #left-icon>
            <span class="icon delete-icon-red"></span>
          </template>
        </ms-button>
      </div>
    </div>
    <!-- table -->
       <MsTableV2 scrollHeight="400px" />
  <asset-modal v-model:isOpen="isOpen"/>
</template>

<script setup>
import { ref } from 'vue'
import AssetModal from './AssetModal.vue'
import MsTableV2 from '@/components/ms-table/MsTableV2.vue'

const handleOpenModal = () => {
  isOpen.value = true
}
//#endregion Methods
//#region State
const isOpen = ref(false)

//#endregion State

//#region Watchers

//#endregion Watchers
</script>

<style scoped>
.filter-controls {
  padding: 14px 20px;
}
.table-controls {
  padding: 0 20px 17px 20px;
}
</style>
