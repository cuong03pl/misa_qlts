<template>
  <ms-modal to="body" :isOpen="isOpen">
    <form @submit="onSubmit" class="modal-content rounded-md">
      <!-- head -->
      <div class="modal-head flex justify-between items-center">
        <slot name="head">
          <span class="text-2xl font-bold">Thêm tài sản</span>
          <span class="btn-close">
            <span @click="handleCloseModal" class="icon close-icon"></span>
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
              tabindex="5"
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
            <ms-input
              tabindex="7"
              type="number"
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
            <ms-input
              tabindex="8"
              size="large"
              isRequired
              v-model="price"
              v-bind="priceAttrs"
              :error_message="errors.price"
              label="Nguyên giá"
              placeholder=""
            />
          </div>
          <div class="col-span-1">
            <ms-input
              tabindex="9"
              size="large"
              isRequired
              :modelValue="depreciationRate"
              v-bind="depreciationRateAttrs"
              :error_message="errors.depreciationRate"
              label="Tỷ lệ hao mòn (%)"
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-16">
          <div class="col-span-1">
            <ms-date-picker
              size="large"
              tabindex="10"
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
              tabindex="10"
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
            <ms-input
              size="large"
              tabindex="12"
              isRequired
              :modelValue="useYears"
              v-bind="useYearsAttrs"
              :error_message="errors.useYears"
              label="Số năm sử dụng"
              placeholder=""
            />
          </div>
          <div class="col-span-1">
            <ms-input
              size="large"
              tabindex="13"
              isRequired
              :modelValue="annualDepreciation"
              v-bind="annualDepreciationAttrs"
              :error_message="errors.annualDepreciation"
              label="Giá trị hao mòn năm"
              placeholder=""
            />
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="modal-footer flex justify-end items-center">
        <slot name="footer">
          <ms-button type="secondary" size="large" @click="handleConfirmModal">Hủy</ms-button>
          <ms-button type="primary" size="large">Lưu</ms-button>
        </slot>
      </div>
    </form>
  </ms-modal>
  <ms-confirm-modal v-model:isOpenConfirmModal="isOpenConfirmModal">
    <template #content> Bạn có muốn hủy bỏ khai báo tài sản này? </template>

    <template #footer>
      <ms-button type="outline" size="medium" @click="handleCloseConfirmModal">Không</ms-button>
      <ms-button type="primary" size="medium" @click="handleConfirmConfirmModal">Hủy bỏ</ms-button>
    </template>
  </ms-confirm-modal>
</template>
  
<script setup>
import AssetAPI from '@/apis/components/AssetAPI'
import AssetTypeAPI from '@/apis/components/AssetTypeAPI'
import DepartmentAPI from '@/apis/components/DepartmentAPI'
import MsModal from '@/components/ms-modal/MsModal.vue'
import MsToast from '@/components/ms-toast/MsToast.vue'
import MsConfirmModal from '@/components/ms-modal/MsConfirmModal.vue'
import { assetSchema } from '@/schemas/asset.schema'
import { useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
const { t } = useI18n()
//#region Props
defineProps({
  isOpen: Boolean,
  mode: String,
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

// nut huy
const handleConfirmModal = () => {
  emit('update:isOpen', false)
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

// nut khong
const handleCloseConfirmModal = () => {
  emit('update:isOpen', true)
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}

// nut huy bo
const handleConfirmConfirmModal = () => {
  handleCloseModal()
  isOpenConfirmModal.value = !isOpenConfirmModal.value
}
/**
 * Hàm xử lý submit form
 * createdby: hkc
 */

const onSubmit = handleSubmit((values) => {
  AssetAPI.create({
    assetCode: values.assetCode,
    assetName: values.assetName,
    departmentId: values.departmentName.departmentId,
    assetTypeId: values.assetTypeName.assetTypeId,
    quantity: values.quantity,
    purchaseDate: values.purchaseDate,
    price: values.price,
    annualDepreciation: values.annualDepreciation,
    depreciationRate: values.depreciationRate,
    useYear: values.useYears,
    startDate: values.startDate,
  })
    .then((response) => {
      // Hiển thị toast
      toast.success({
        component: MsToast,
        props: { type: 'success', message: 'Lưu dữ liệu thành công' },
      })
      // clear form
      handleCloseModal()
    })
    .catch((error) => {
      console.error('Lỗi tạo tài sản:', error)
    })
})

//#endregion handle Form
//#region methods
const handleCloseModal = () => {
  emit('update:isOpen', false)
  resetForm()
}
//#endregion methods
//#region State
const isOpenConfirmModal = ref(false)
const departments = ref([])
const assetTypes = ref([])
const currentYear = ref(new Date().getFullYear())
const toast = useToast()
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
watch([price, depreciationRate], () => {
  annualDepreciation.value = (price.value * depreciationRate.value) / 100
})

watch(assetTypeName, () => {
  depreciationRate.value = assetTypeName.value?.depreciationRate ?? 0
  useYears.value = assetTypeName.value?.lifeTime ?? 0
})
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
  