<template>
  <!-- filter -->
  <div class="filter-controls flex flex-wrap justify-between items-center gap-10">
    <div class="filter-controls-left flex items-center gap-11">
      <ms-search v-model="q" :placeholder="t('asset.filterSearchPlaceholder')" />
      <ms-select
        v-model="assetType"
        :dataOptions="assetTypes"
        optionLabel="assetTypeName"
        isFilter
        hasLeftIcon
        :placeholder="t('asset.filterAssetTypePlaceholder')"
      />
      <ms-select
        v-model="department"
        :dataOptions="departments"
        optionLabel="departmentName"
        isFilter
        hasLeftIcon
        :placeholder="t('asset.filterDepartmentPlaceholder')"
      />
    </div>
    <div class="flex items-center gap-10">
      <!-- thêm tài sản -->
      <ms-button @click="handleOpenModal" type="one-icon" size="large">
        <template #left-icon>
          <span class="icon plus-icon"></span>
        </template>
        <span class="text-white">{{ t('asset.addAsset') }}</span>
      </ms-button>
      <ms-button type="only-icon" size="large">
        <template #left-icon>
          <span class="icon excel-icon"></span>
        </template>
      </ms-button>
      <ms-button
        :disabled="selectedAssets?.length === 0"
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
  <asset-table
    :assets="assets"
    v-model:selectedAssets="selectedAssets"
    :totalRecords="totalRecords"
    v-model:pageSize="pageSize"
    v-model:pageNumber="pageNumber"
    @pageChange="handlePageChange"
    @edit="handleEditAsset"
    @duplicate="handleDuplicateAsset"
    @delete="handleDeleteModal"
    @add="handleOpenModal"
    :header="getAssetHeader(t)"
  />
  <asset-modal
    @submit="handleSubmit"
    v-model:isOpen="isOpen"
    :mode="modalMode"
    :assetData="currentAsset"
  />

  <!-- Modal xác nhận xóa -->
  <ms-confirm-modal
    v-model:isOpenConfirmModal="isOpenConfirmModal"
    :content="deleteConfirmContent"
    confirmText="Xóa"
    cancelText="Không"
    confirmType="primary"
    @confirm="handleDelete"
  />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import AssetModal from './AssetModal.vue'
import AssetTable from './AssetTable.vue'
import AssetAPI from '@/apis/components/AssetAPI'
import MsConfirmModal from '@/components/ms-modal/MsConfirmModal.vue'
import { useRoute, useRouter } from 'vue-router'
import _ from 'lodash'
import { formatDateOnly } from '@/utils/formatDate'
import { useI18n } from 'vue-i18n'
import { useToastNotification } from '@/composables/useToastNotification'
import { useFilterData } from '@/composables/useFilterData'
import { getAssetHeader } from '@/constants/assetHeader'
//#region State
const isOpen = ref(false)
const assets = ref([])
const isOpenConfirmModal = ref(false)
const selectedAssets = ref([])
const modalMode = ref('add')
const currentAsset = ref(null) // Tài sản đang được chỉnh sửa
const route = useRoute()
const router = useRouter()
const q = ref('')
const assetType = ref('')
const department = ref('')
const pageNumber = ref(1)
const pageSize = ref(20)
const totalRecords = ref(0)
const { t } = useI18n()
const { showSuccess, showError } = useToastNotification()
const { departments, assetTypes, fetchFiltersData } = useFilterData()
//#endregion State

//#region Computed
/**
 * Nội dung hiển thị trong modal xác nhận xóa
 * createdby: HK Cường
 */
const deleteConfirmContent = computed(() => {
  if (selectedAssets.value.length <= 1) {
    return t('asset.deleteConfirmContent')
  } else {
    return `<span style="font-weight: 700">${selectedAssets.value.length}</span> ${t(
      'asset.deleteConfirmContentMultiple'
    )}`
  }
})
//#endregion Computed

//#region Methods

/**
 * Debounce dữ liệu filter
 * createdby: HK Cường
 */
const debouncedFetch = _.debounce(async () => {
  const params = {
    q: q.value || undefined,
    assetTypeCode: assetType.value?.assetTypeCode || undefined,
    departmentCode: department.value?.departmentCode || undefined,
    pageNumber: pageNumber.value > 1 ? pageNumber.value : undefined,
    pageSize: pageSize.value > 20 ? pageSize.value : undefined,
  }

  // Loại bỏ các tham số undefined khỏi URL
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  )

  router.push({
    query: cleanParams,
  })
  await fetchData(cleanParams)
}, 300)

/**
 * Lấy dữ liệu theo trang
 * @param {Object} params - Tham số phân trang
 * createdby: HK Cường
 */
const fetchData = async (params = { pageNumber: 1, pageSize: 20, q: '' }) => {
  try {
    const response = await AssetAPI.paging(params)
    totalRecords.value = response.data?.totalRecords
    assets.value = response.data
    return response
  } catch (error) {
    showError(error, t('asset.fetchError'))
    return null
  }
}

/**
 * Xử lý bật tắt modal add
 * createdby: HK Cường
 */
const handleOpenModal = () => {
  modalMode.value = 'add'
  currentAsset.value = null
  isOpen.value = true
}

/**
 * Xử lý khi click vào icon edit
 * @param {Object} asset - Dữ liệu tài sản được chọn
 * createdby: HK Cường
 */
const handleEditAsset = async (asset) => {
  try {
    modalMode.value = 'edit'
    // Lấy thông tin chi tiết của tài sản từ API
    const response = await AssetAPI.getById(asset.assetId)

    currentAsset.value = response.data
    isOpen.value = true
  } catch (error) {
    showError(error, t('asset.notFound'))
  }
}
/**
 * Xử lý khi click vào icon duplicate
 * @param {Object} asset - Dữ liệu tài sản được chọn
 * createdby: HK Cường
 */
const handleDuplicateAsset = async (asset) => {
  try {
    modalMode.value = 'duplicate'
    // Lấy thông tin chi tiết của tài sản từ API
    const response = await AssetAPI.getById(asset.assetId, { mode: 'duplicate' })

    currentAsset.value = response.data
    isOpen.value = true
  } catch (error) {
    showError(error, t('asset.notFound'))
  }
}
/**
 * Xử lý bật tắt modal xóa tài sản
 * createdby: HK Cường
 */
const handleDeleteModal = () => {
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

/**
 * Xử lý xóa tài sản
 * createdby: HK Cường
 */
const handleDelete = async () => {
  const assetIds = selectedAssets.value.map((asset) => asset.assetId)
  try {
    await AssetAPI.deleteMultiple(assetIds)
    showSuccess(`${assetIds.length} ${t('asset.deleteSuccess')}`)
    selectedAssets.value = []
    await fetchData()
  } catch (error) {
    showError(error, t('asset.deleteError'))
  }
}
/**
 * Xử lý khi thay đổi trang
 * @param {Object} pageInfo - Thông tin trang mới
 * createdby: HK Cường
 */
const handlePageChange = (pageInfo) => {
  pageNumber.value = pageInfo.pageNumber
  pageSize.value = pageInfo.pageSize
}

/**
 * Xử lý submit form
 * @param {Object} values - Dữ liệu form
 * createdby: HK Cường
 */
const handleSubmit = async (values) => {
  try {
    if (values.annualDepreciation > values.price) {
      showError(null, 'Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá')
      return
    }
    const assetData = {
      assetCode: values.assetCode,
      assetName: values.assetName,
      departmentId: values.departmentName.departmentId,
      assetTypeId: values.assetTypeName.assetTypeId,
      quantity: values.quantity,
      purchaseDate: formatDateOnly(values.purchaseDate),
      price: values.price,
      annualDepreciation: values.annualDepreciation,
      useYear: values.purchaseDate.getFullYear(),
      startDate: formatDateOnly(values.startDate),
    }

    if (modalMode.value === 'edit' && currentAsset.value) {
      // Nếu đang ở chế độ edit, thực hiện cập nhật
      await AssetAPI.update(currentAsset.value.assetId, assetData)
      showSuccess(t('asset.updateSuccess'))
    } else {
      // Nếu đang ở chế độ add hoặc duplicate, thực hiện tạo mới
      await AssetAPI.create(assetData)
      showSuccess(modalMode.value === 'add' ? t('asset.addSuccess') : t('asset.duplicateSuccess'))
    }

    await fetchData()
    // Đóng modal
    isOpen.value = false
  } catch (error) {
    showError(error, t('asset.submitError'))
    // await fetchData()
  }
}
//#endregion Methods

//#region API
/**
 * Binding giá trị từ query params trong URL vào filters
 * createdby: HK Cường
 */
const bindFiltersFromQuery = () => {
  // Gán giá trị tìm kiếm từ URL
  q.value = route.query.q || ''
  pageNumber.value = Number(route.query.pageNumber) || 1
  pageSize.value = Number(route.query.pageSize) || 20

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
}

/**
 * Lấy dữ liệu tài sản
 * createdby: HK Cường
 */
const fetchAssets = async () => {
  await fetchData({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value,
    q: q.value,
    assetTypeCode: assetType.value?.assetTypeCode,
    departmentCode: department.value?.departmentCode,
  })
}

/**
 * Khởi tạo trang khi mounted
 * createdby: hkc
 */
onMounted(async () => {
  try {
    // Lấy dữ liệu departments và assetTypes
    await fetchFiltersData()

    // Đọc query param từ URL và load filters
    bindFiltersFromQuery()

    // Lấy dữ liệu tài sản
    await fetchAssets()
  } catch (error) {
    showError(error, t('asset.initError'))
  }
})
//#endregion API

// Khi filter thì reset cái pageNumber = 1
watch(
  [q, assetType, department],
  () => {
    pageNumber.value = 1
    debouncedFetch()
  },
  { deep: true }
)

watch([pageSize], () => {
  pageNumber.value = 1
})

watch([pageNumber, pageSize], () => {
  debouncedFetch()
})
</script>

<style scoped>
.filter-controls {
  padding: 13px 20px;
}
.table-controls {
  padding: 0 20px 17px 20px;
}
</style>
