<template>
  <!-- filter -->
  <div class="filter-controls flex justify-between items-center">
    <div class="flex items-center gap-11">
      <ms-search v-model="q" placeholder="Tìm kiếm tài sản" />
      <ms-select
        v-model="assetType"
        :dataOptions="assetTypes"
        optionLabel="assetTypeName"
        isFilter
        hasLeftIcon
        placeholder="Loại tài sản"
      />
      <ms-select
        v-model="department"
        :dataOptions="departments"
        optionLabel="departmentName"
        isFilter
        hasLeftIcon
        placeholder="Bộ phận sử dụng"
      />
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
      <ms-button
        :disabled="selectedAssets.length === 0"
        @click="handleDeleteModal"
        type="only-icon"
        size="large"
      >
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
    @edit="handleEditAsset"
  />
  <asset-modal
    @submit="handleSubmit"
    v-model:isOpen="isOpen"
    :mode="modalMode"
    :assetData="currentAsset"
  />

  <ms-confirm-modal v-model:isOpenConfirmModal="isOpenConfirmModal">
    <template #content>
      {{ selectedAssets.length }} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh
      sách?
    </template>
    <template #footer>
      <ms-button type="outline" size="medium" @click="handleDeleteModal">Không</ms-button>
      <ms-button type="primary" size="medium" @click="handleDelete">Xóa</ms-button>
    </template>
  </ms-confirm-modal>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import AssetModal from './AssetModal.vue'
import MsTableV2 from '@/components/ms-table/MsTableV2.vue'
import AssetAPI from '@/apis/components/AssetAPI'
import MsConfirmModal from '@/components/ms-modal/MsConfirmModal.vue'
import MsToast from '@/components/ms-toast/MsToast.vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import _ from 'lodash'
import DepartmentAPI from '@/apis/components/DepartmentAPI'
import AssetTypeAPI from '@/apis/components/AssetTypeAPI'

const debouncedFetch = _.debounce(async () => {
  const params = {
    q: q.value || undefined,
    assetTypeCode: assetType.value?.assetTypeCode || undefined,
    departmentCode: department.value?.departmentCode || undefined,
    pageNumber: pageNumber.value || undefined,
    pageSize: pageSize.value || undefined,
  }

  // Loại bỏ các tham số undefined khỏi URL
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  )

  router.push({
    query: cleanParams,
  })
  await fetchData(params)
}, 500)
//#region Methods
/**
 * Lấy dữ liệu theo trang
 * @param {Object} params - Tham số phân trang
 */
const fetchData = async (params = { pageNumber: 1, pageSize: 10, q: '' }) => {
  try {
    const response = await AssetAPI.paging(params)
    assets.value = response.data?.data
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Xử lý bật tắt modal
 */
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

/**
 * Xử lý bật tắt modal xóa tài sản
 */
const handleDeleteModal = () => {
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

/**
 * Xử lý xóa tài sản
 */
const handleDelete = async () => {
  const assetIds = selectedAssets.value.map((asset) => asset.assetId)
  try {
    await AssetAPI.deleteMultiple(assetIds)
    toast.success({
      component: MsToast,
      props: { type: 'success', message: `${assetIds.length} tài sản đã được xóa thành công` },
    })
    selectedAssets.value = []
    await fetchData()
  } catch (error) {
    console.log(error)
  }
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

/**
 * Xử lý submit form
 * @param {Object} values - Dữ liệu form
 */
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

    await fetchData()
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
const route = useRoute()
const router = useRouter()
const q = ref('')
const assetType = ref('')
const department = ref('')
const departments = ref([])
const assetTypes = ref([])
const pageNumber = ref(1)
const pageSize = ref(10)
//#endregion State

//#region API
/**
 * Lấy tất cả dữ liệu tài sản khi mount
 * createdby: hkc
 */
onMounted(async () => {
  try {
    // Tải dữ liệu departments và assetTypes
    const [departmentRes, assetTypeRes] = await Promise.all([
      DepartmentAPI.getAll(),
      AssetTypeAPI.getAll(),
    ])
    departments.value = departmentRes.data
    assetTypes.value = assetTypeRes.data

    // Đọc query param từ URL khi tải trang
    if (route.query) {
      // Gán giá trị tìm kiếm từ URL
      q.value = route.query.q || ''
      pageNumber.value = Number(route.query.pageNumber) || 1
      pageSize.value = Number(route.query.pageSize) || 10

      // Lấy department từ departmentCode trong URL để binding vào select department
      if (route.query.departmentCode) {
        department.value =
          departments.value.find((dept) => dept.departmentCode === route.query.departmentCode) || ''
      }

      // Lấy assetType từ assetTypeCode trong URL để binding vào select assetType
      if (route.query.assetTypeCode) {
        assetType.value =
          assetTypes.value.find((type) => type.assetTypeCode === route.query.assetTypeCode) || ''
      }

      // Fetch dữ liệu với các tham số từ URL
      await fetchData({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        q: q.value,
        assetTypeCode: assetType.value?.assetTypeCode,
        departmentCode: department.value?.departmentCode,
      })
    } else {
      await fetchData()
    }
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error)
    await fetchData()
  }
})
//#endregion API

watch(
  [q, assetType, department, pageNumber, pageSize],
  () => {
    debouncedFetch()
  },
  { deep: true }
)
</script>

<style scoped>
.filter-controls {
  padding: 14px 20px;
}
.table-controls {
  padding: 0 20px 17px 20px;
}
</style>
