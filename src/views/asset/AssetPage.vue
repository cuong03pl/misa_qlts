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
  <MsTableV2
    dataKey="assetCode"
    v-model="selectedAssets"
    scrollHeight="400px"
    :rows="assets"
    @editAsset="handleEditAsset"
  />
  <asset-modal
    @submit="handleSubmit"
    v-model:isOpen="isOpen"
    :mode="modalMode"
    :assetData="currentAsset"
  />

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
import MsToast from '@/components/ms-toast/MsToast.vue'
import { useToast } from 'vue-toastification'

//#region Methods
const handleOpenModal = () => {
  modalMode.value = 'add'
  currentAsset.value = null
  isOpen.value = true
}

/**
 * Xử lý khi click vào icon edit
 * @param {Object} asset - Dữ liệu tài sản được chọn
 */
const handleEditAsset = async (asset) => {
  try {
    modalMode.value = 'edit'
    // Lấy thông tin chi tiết của tài sản từ API
    const response = await AssetAPI.getById(asset.assetId)

    currentAsset.value = response.data
    isOpen.value = true
  } catch (error) {
    console.error('Lỗi khi lấy thông tin tài sản:', error)
  }
}

const handleDeleteModal = () => {
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

const handleDelete = async () => {
  const assetIds = selectedAssets.value.map((asset) => asset.assetId)
  try {
    await AssetAPI.deleteMultiple(assetIds)
    toast.success({
      component: MsToast,
      props: { type: 'success', message: `${assetIds.length} tài sản đã được xóa thành công` },
    })
    const response = await AssetAPI.getAll()
    assets.value = response.data
  } catch (error) {
    console.log(error)
  }
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

const handleSubmit = async (values) => {
  try {
    const assetData = {
      assetCode: values.assetCode,
      assetName: values.assetName,
      departmentId: values.departmentName.departmentId,
      assetTypeId: values.assetTypeName.assetTypeId,
      quantity: values.quantity,
      purchaseDate: values.purchaseDate,
      price: values.price,
      annualDepreciation: values.annualDepreciation,
      useYear: values.useYears,
      startDate: values.startDate,
    }

    if (modalMode.value === 'edit' && currentAsset.value) {
      // Nếu đang ở chế độ edit, thực hiện cập nhật
      await AssetAPI.update(currentAsset.value.assetId, assetData)
      toast.success({
        component: MsToast,
        props: { type: 'success', message: 'Cập nhật tài sản thành công' },
      })
    } else {
      // Nếu đang ở chế độ add, thực hiện tạo mới
      await AssetAPI.create(assetData)
      toast.success({
        component: MsToast,
        props: { type: 'success', message: 'Thêm tài sản thành công' },
      })
      // Nếu API trả về ID của tài sản mới, thêm vào danh sách
    }

    const getAllResponse = await AssetAPI.getAll()
    assets.value = getAllResponse.data
    // Đóng modal
    isOpen.value = false
  } catch (error) {
    console.error('Lỗi xử lý tài sản:', error)
  }
}
//#endregion Methods

//#region State
const isOpen = ref(false)
const assets = ref([])
const isOpenConfirmModal = ref(false)
const selectedAssets = ref([])
const modalMode = ref('add')
const currentAsset = ref(null) // Tài sản đang được chỉnh sửa
const toast = useToast()
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
