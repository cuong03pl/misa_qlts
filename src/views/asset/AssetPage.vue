<template>
  <!-- filter -->
  <div class="filter-controls flex justify-between items-center">
    <div class="flex items-center gap-11">
      <ms-search placeholder="Tìm kiếm tài sản" />
      <ms-select isFilter hasLeftIcon placeholder="Loại tài sản" />
      <ms-select isFilter hasLeftIcon placeholder="Bộ phận sử dụng" />
    </div>
    <div class="flex items-center gap-10">
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
      <ms-button @click="handleDeleteModal" type="only-icon" size="large">
        <template #left-icon>
          <span class="icon delete-icon-red"></span>
        </template>
      </ms-button>
    </div>
  </div>
  <!-- table -->
  <MsTableV2 v-model="selectedAssets" scrollHeight="400px" :rows="assets" />
  <asset-modal v-model:isOpen="isOpen" />

  <ms-confirm-modal v-model:isOpenConfirmModal="isOpenConfirmModal">
    <template #content> Bạn có muốn xóa tài sản này? </template>

    <template #footer>
      <ms-button type="outline" size="medium" @click="handleDeleteModal">Không</ms-button>
      <ms-button type="primary" size="medium" @click="handleDelete">Xóa</ms-button>
    </template>
  </ms-confirm-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AssetModal from './AssetModal.vue'
import MsTableV2 from '@/components/ms-table/MsTableV2.vue'
import AssetAPI from '@/apis/components/AssetAPI'
import MsConfirmModal from '@/components/ms-modal/MsConfirmModal.vue'
//#region Methods
const handleOpenModal = () => {
  isOpen.value = true
}

const handleDeleteModal = () => {
  console.log(selectedAssets.value)

  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

const handleDelete = () => {
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}
//#endregion Methods

//#region State
const isOpen = ref(false)
const assets = ref([])
const isOpenConfirmModal = ref(false)
const selectedAssets = ref([])
//#endregion State

//#region API
/**
 * Lấy tất cả dữ liệu tài sản khi mount
 * createdby: hkc
 */
onMounted(async () => {
  try {
    const response = await AssetAPI.getAll()
    assets.value = response.data
  } catch (error) {
    console.log(error)
  }
})
//#endregion API
</script>

<style scoped>
.filter-controls {
  padding: 14px 20px;
}
.table-controls {
  padding: 0 20px 17px 20px;
}
</style>
