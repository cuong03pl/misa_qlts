<template>
  <ms-modal to="body" :isOpen="isOpen">
    <form @submit="onSubmit" class="modal-content rounded-md">
      <!-- head -->
      <div class="modal-head flex justify-between items-center">
        <slot name="head">
          <span class="text-2xl font-bold">{{
            props.mode === 'edit' ? 'Sửa tài sản' : 'Thêm tài sản'
          }}</span>
          <span class="btn-close">
            <span @click="showCancelConfirm" class="icon close-icon"></span>
          </span>
        </slot>
      </div>

      <!-- content -->
      <div class="scroll modal-body flex flex-col gap-20">
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-input
              tabindex="1"
              size="large"
              isRequired
              v-model="assetCode"
              v-bind="assetCodeAttrs"
              :error_message="errors.assetCode"
              label="Mã tài sản"
            />
          </div>
          <div class="col-span-2">
            <ms-input
              ref="firstInputRef"
              tabindex="2"
              size="large"
              isRequired
              v-model="assetName"
              v-bind="assetNameAttrs"
              :error_message="errors.assetName"
              label="Tên tài sản"
              placeholder="Nhập tên tài sản"
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-select
              tabindex="3"
              size="large"
              isRequired
              v-model="departmentName"
              v-bind="departmentNameAttrs"
              :error_message="errors.departmentName"
              label="Mã bộ phận sử dụng"
              placeholder="Chọn mã bộ phận sử dụng"
              :dataOptions="departments"
              optionLabel="departmentCode"
            />
          </div>
          <div class="col-span-2">
            <ms-input
              size="large"
              disabled
              :modelValue="departmentName?.departmentName"
              label="Tên bộ phận sử dụng"
              placeholder=""
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-select
              tabindex="4"
              size="large"
              isRequired
              v-model="assetTypeName"
              v-bind="assetTypeNameAttrs"
              :error_message="errors.assetTypeName"
              label="Mã loại tài sản"
              placeholder="Chọn mã loại tài sản"
              :dataOptions="assetTypes"
              optionLabel="assetTypeCode"
            />
          </div>
          <div class="col-span-2">
            <ms-input
              size="large"
              disabled
              :modelValue="assetTypeName?.assetTypeName"
              label="Tên loại tài sản"
              placeholder=""
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-input-number
              tabindex="5"
              hasButton
              isRequired
              size="large"
              v-model="quantity"
              v-bind="quantityAttrs"
              :error_message="errors.quantity"
              label="Số lượng"
              placeholder=""
            />
          </div>
          <div class="col-span-1">
            <ms-input-number
              tabindex="6"
              size="large"
              isRequired
              v-model="price"
              v-bind="priceAttrs"
              :error_message="errors.price"
              label="Nguyên giá"
              numType="decimal"
            />
          </div>
          <div class="col-span-1">
            <ms-input-number
              tabindex="7"
              size="large"
              isRequired
              v-model="depreciationRate"
              v-bind="depreciationRateAttrs"
              :error_message="errors.depreciationRate"
              label="Tỷ lệ hao mòn (%)"
              numType="decimal"
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-date-picker
              size="large"
              tabindex="8"
              isRequired
              v-model="purchaseDate"
              v-bind="purchaseDateAttrs"
              :error_message="errors.purchaseDate"
              label="Ngày mua"
            />
          </div>
          <div class="col-span-1">
            <ms-date-picker
              size="large"
              tabindex="9"
              isRequired
              v-model="startDate"
              v-bind="startDateAttrs"
              :error_message="errors.startDate"
              label="Ngày bắt đầu sử dụng"
            />
          </div>
          <div class="col-span-1">
            <ms-input
              size="large"
              :modelValue="currentYear"
              disabled
              label="Năm theo dõi"
              placeholder=""
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-input-number
              hasButton
              size="large"
              tabindex="10"
              isRequired
              v-model="useYears"
              v-bind="useYearsAttrs"
              :error_message="errors.useYears"
              label="Số năm sử dụng"
              placeholder=""
            />
          </div>
          <div class="col-span-1">
            <ms-input-number
              size="large"
              tabindex="11"
              isRequired
              v-model="annualDepreciation"
              v-bind="annualDepreciationAttrs"
              :error_message="errors.annualDepreciation"
              label="Giá trị hao mòn năm"
              placeholder=""
              numType="decimal"
            />
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="modal-footer flex justify-end items-center">
        <slot name="footer">
          <ms-button
            tabindex="12"
            type="secondary"
            size="large"
            htmlType="button"
            @click="showCancelConfirm"
            >Hủy</ms-button
          >
          <ms-button tabindex="13" type="primary" size="large" htmlType="submit">Lưu</ms-button>
        </slot>
      </div>
    </form>
  </ms-modal>

  <!-- Modal xác nhận dùng cho add, duplicate -->
  <ms-confirm-modal
    v-if="mode != 'edit'"
    v-model:isOpenConfirmModal="isOpenConfirmModal"
    content="Bạn có muốn hủy bỏ khai báo tài sản này?"
    confirmText="Hủy bỏ"
    cancelText="Không"
    confirmType="primary"
    @confirm="handleConfirmCancel"
  />

  <!-- Modal xác nhận dùng cho update -->
  <ms-confirm-modal
    v-if="mode == 'edit'"
    v-model:isOpenConfirmModal="isOpenConfirmModal"
    content="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
    confirmText="Lưu"
    cancelText="Hủy"
    cancelSaveText="Không lưu"
    confirmType="primary"
    @confirm="onSubmit"
    @cancel="handleConfirmCancel"
  />
</template>
  
<script setup>
import AssetTypeAPI from '@/apis/components/AssetTypeAPI'
import DepartmentAPI from '@/apis/components/DepartmentAPI'
import AssetAPI from '@/apis/components/AssetAPI'
import MsModal from '@/components/ms-modal/MsModal.vue'
import MsConfirmModal from '@/components/ms-modal/MsConfirmModal.vue'
import { assetSchema } from '@/schemas/asset.schema'
import { useForm } from 'vee-validate'
import { onMounted, ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { isEqual } from 'lodash'
const { t } = useI18n()
//#region Props
const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: 'add',
  },
  assetData: {
    type: Object,
    default: () => ({}),
  },
})

//#endregion Props
//#region Emits
const emit = defineEmits(['update:isOpen'])
//#endregion Emits

//#region handle Form
const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: assetSchema(t),
  initialValues: {
    quantity: 0,
    price: 0,
    annualDepreciation: 0,
    depreciationRate: 0,
  },
})

const [assetCode, assetCodeAttrs] = defineField('assetCode')
const [assetName, assetNameAttrs] = defineField('assetName')
const [departmentName, departmentNameAttrs] = defineField('departmentName')
const [assetTypeName, assetTypeNameAttrs] = defineField('assetTypeName')
const [quantity, quantityAttrs] = defineField('quantity')
const [purchaseDate, purchaseDateAttrs] = defineField('purchaseDate')
const [price, priceAttrs] = defineField('price')
const [annualDepreciation, annualDepreciationAttrs] = defineField('annualDepreciation')
const [depreciationRate, depreciationRateAttrs] = defineField('depreciationRate')
const [startDate, startDateAttrs] = defineField('startDate')
const [useYears, useYearsAttrs] = defineField('useYears')

// nut huy - mở confirm modal
const showCancelConfirm = () => {
  // Nếu mode là edit, so sánh dữ liệu hiện tại với dữ liệu đã clone
  if (props.mode === 'edit' && clonedAssetData.value) {
    const currentData = getCurrentFormData()

    if (isEqual(clonedAssetData.value, currentData)) {
      handleConfirmCancel()
    } else {
      isOpenConfirmModal.value = true
    }
  } else {
    isOpenConfirmModal.value = true
  }
}

// nut huy bo - xác nhận hủy bỏ
const handleConfirmCancel = () => {
  handleCloseModal()
}
/**
 * Hàm xử lý submit form
 * createdby: hkc
 */

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

//#endregion handle Form
//#region methods
const handleCloseModal = () => {
  emit('update:isOpen', false)
  resetForm()
}

/**
 * Hàm tự động generate mã tài sản mới khi add, duplicate
 * createdby: hkc
 */
const generateAssetCode = async () => {
  try {
    const response = await AssetAPI.generateNewAssetCode()
    if (response.data) {
      assetCode.value = response.data
    }
  } catch (error) {
    console.error('Lỗi khi generate mã tài sản:', error)
  }
}

/**
 * Hàm lấy dữ liệu hiện tại từ form
 * @returns {Object} - Dữ liệu hiện tại trong form
 */
const getCurrentFormData = () => {
  return {
    assetCode: assetCode.value,
    assetName: assetName.value,
    departmentId: departmentName.value?.departmentId,
    departmentName: departmentName.value?.departmentName,
    assetTypeId: assetTypeName.value?.assetTypeId,
    assetTypeName: assetTypeName.value?.assetTypeName,
    quantity: quantity.value,
    price: price.value,
    depreciationRate: depreciationRate.value,
    annualDepreciation: annualDepreciation.value,
    useYear: useYears.value,
    // Chuyển ngày về timestamp
    purchaseDate: purchaseDate.value ? new Date(purchaseDate.value).getTime() : null,
    startDate: startDate.value ? new Date(startDate.value).getTime() : null,
  }
}

//#endregion methods
//#region State
const isOpenConfirmModal = ref(false)
const departments = ref([])
const assetTypes = ref([])
const currentYear = ref(new Date().getFullYear())
const clonedAssetData = ref(null)
const firstInputRef = ref(null)
//#endregion State

//#region API
/**
 * Lấy tất cả dữ liệu bộ phận sử dụng, loại tài sản khi mount
 * createdby: hkc
 */
onMounted(async () => {
  try {
    const [departmentRes, assetTypeRes] = await Promise.all([
      DepartmentAPI.getAll(),
      AssetTypeAPI.getAll(),
    ])
    departments.value = departmentRes.data
    assetTypes.value = assetTypeRes.data
  } catch (error) {
    console.error('Lỗi tải dữ liệu:', error)
  }
})
//#endregion API

//#region Watch
const isLoadingData = ref(false)
watch([price, depreciationRate], () => {
  if (!isLoadingData.value) {
    annualDepreciation.value = (price.value * depreciationRate.value) / 100
  }
})

watch(assetTypeName, () => {
  depreciationRate.value = assetTypeName.value?.depreciationRate ?? 0
  useYears.value = assetTypeName.value?.lifeTime ?? 0
})
watch(
  () => props.isOpen,
  async () => {
    if (!props.isOpen) {
      resetForm()
      clonedAssetData.value = null
    } else if (props.mode === 'add') {
      await generateAssetCode()
      await nextTick()
      firstInputRef.value?.focus()
    } else if (props.mode === 'duplicate' && props.assetData) {
      await setFormData(props.assetData)
      // await generateAssetCode()
      await nextTick()
      firstInputRef.value?.focus()
    } else if (props.mode === 'edit' && props.assetData) {
      await setFormData(props.assetData)

      clonedAssetData.value = {
        assetCode: props.assetData.assetCode,
        assetName: props.assetData.assetName,
        departmentId: props.assetData.departmentId,
        departmentName: props.assetData.departmentName,
        assetTypeId: props.assetData.assetTypeId,
        assetTypeName: props.assetData.assetTypeName,
        quantity: props.assetData.quantity,
        price: props.assetData.price,
        depreciationRate: props.assetData.depreciationRate,
        annualDepreciation: props.assetData.annualDepreciation,
        useYear: props.assetData.useYear,
        purchaseDate: props.assetData.purchaseDate
          ? new Date(props.assetData.purchaseDate).getTime()
          : null,
        startDate: props.assetData.startDate ? new Date(props.assetData.startDate).getTime() : null,
      }
      await nextTick()
      firstInputRef.value?.focus()
    }
  }
)

/**
 * Hàm fill dữ liệu vào form khi ở chế độ sửa, duplicate
 * @param {Object} data - Dữ liệu tài sản của dòng được click
 */
const setFormData = async (data) => {
  if (!data) return

  isLoadingData.value = true

  // Set các giá trị cơ bản
  assetCode.value = data.assetCode
  assetName.value = data.assetName
  quantity.value = data.quantity
  price.value = data.price
  useYears.value = data.useYear
  depreciationRate.value = data.depreciationRate

  // Xử lý ngày tháng
  if (data.startDate) {
    startDate.value = new Date(data.startDate)
  }

  if (data.purchaseDate) {
    purchaseDate.value = new Date(data.purchaseDate)
  }

  // Tìm và set department và assetType từ danh sách
  if (departments.value.length > 0) {
    const dept = departments.value.find((d) => d.departmentId === data.departmentId)
    if (dept) {
      departmentName.value = dept
    }
  }

  if (assetTypes.value.length > 0) {
    const assetType = assetTypes.value.find((t) => t.assetTypeId === data.assetTypeId)
    if (assetType) {
      assetTypeName.value = assetType
    }
  }

  // Đợi tất cả watcher chạy xong
  await nextTick()

  annualDepreciation.value = data.annualDepreciation

  isLoadingData.value = false
}
//#endregion Watch
</script>
  

<style>
.sub {
  color: #ccc;
  font-size: 14px;
}

.scroll {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}
</style>
  