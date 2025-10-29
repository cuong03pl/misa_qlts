<template>
    <ms-modal to="body" :isOpen="isOpen">
      <form @submit="onSubmit" class="modal-content rounded-md">
        <!-- head -->
        <div class="modal-head flex justify-between items-center">
            <slot name="head">
            <span class="text-2xl font-bold">Thêm tài sản</span>
            <span class="btn-close">
                <span @click="emit('update:isOpen', false)" class="icon close-icon"></span>
            </span>
            </slot>
        </div>

        <!-- content -->
        <div class="scroll modal-body flex flex-col gap-20">
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input size="large" isRequired v-model="assetCode" v-bind="assetCodeAttrs" :error_message="errors.assetCode" label="Mã tài sản"/>
                </div>
                <div class="col-span-2">
                    <ms-input size="large" isRequired v-model="assetName" v-bind="assetNameAttrs" :error_message="errors.assetName" label="Tên tài sản" placeholder="Nhập tên tài sản" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-select 
                      size="large"
                      isRequired 
                      v-model="departmentName" 
                      v-bind="departmentNameAttrs" 
                      :error_message="errors.departmentName" 
                      label="Mã bộ phận sử dụng" 
                      placeholder="Chọn mã bộ phận sử dụng"
                    />
                </div>
                <div class="col-span-2">
                    <ms-input size="large" disabled label="Tên bộ phận sử dụng" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-select size="large" isRequired v-model="assetTypeName" v-bind="assetTypeNameAttrs" :error_message="errors.assetTypeName" label="Mã loại tài sản" placeholder="Chọn mã loại tài sản"/>
                </div>
                <div class="col-span-2">
                    <ms-input size="large" disabled label="Tên loại tài sản" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input type="number" isRequired size="large" v-model="quantity" v-bind="quantityAttrs" :error_message="errors.quantity" label="Số lượng" placeholder=""/>
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired v-model="price" v-bind="priceAttrs" :error_message="errors.price" label="Nguyên giá" placeholder="" />
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired v-model="annualDepreciation" v-bind="annualDepreciationAttrs" :error_message="errors.annualDepreciation" label="Tỷ lệ hao mòn (%)" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input size="large" type="date" isRequired v-model="purchaseDate" v-bind="purchaseDateAttrs" :error_message="errors.purchaseDate" label="Ngày mua" placeholder=""/>
                </div>
                <div class="col-span-1">
                    <ms-input size="large" type="date" isRequired v-model="startUseDate" v-bind="startUseDateAttrs" :error_message="errors.startUseDate" label="Ngày bắt đầu sử dụng" placeholder="" />
                </div>
                <div class="col-span-1">
                    <ms-input size="large" disabled label="Năm theo dõi" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input size="large" isRequired v-model="useYears" v-bind="useYearsAttrs" :error_message="errors.useYears" label="Số năm sử dụng" placeholder=""/>
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired v-model="residualValue" v-bind="residualValueAttrs" :error_message="errors.residualValue"     label="Giá trị hao mòn năm" placeholder="" />
                </div>
               
            </div>
         </div>

         <!-- footer -->
         <div class="modal-footer flex justify-end items-center">
            <slot name="footer">
            <ms-button type="secondary" size="large" @click="emit('update:isOpen', false)">Hủy</ms-button>
            <ms-button type="primary" size="large">Lưu</ms-button>
            </slot>
      </div>
      </form>
    </ms-modal>
</template>
  
<script setup>
import MsModal from '@/components/ms-modal/MsModal.vue'
import { assetSchema } from '@/schemas/asset.schema'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
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

  const { errors, handleSubmit, defineField } = useForm({
  validationSchema: assetSchema(t),
})

const [assetCode, assetCodeAttrs] = defineField('assetCode')
const [assetName, assetNameAttrs] = defineField('assetName')
const [departmentName, departmentNameAttrs] = defineField('departmentName')
const [assetTypeName, assetTypeNameAttrs] = defineField('assetTypeName')
const [quantity, quantityAttrs] = defineField('quantity')
const [purchaseDate, purchaseDateAttrs] = defineField('purchaseDate')
const [price, priceAttrs] = defineField('price')
const [annualDepreciation, annualDepreciationAttrs] = defineField('annualDepreciation')
const [residualValue, residualValueAttrs] = defineField('residualValue')
const [startUseDate, startUseDateAttrs] = defineField('startUseDate')
const [useYears, useYearsAttrs] = defineField('useYears')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
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
  