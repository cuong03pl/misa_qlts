<template>
    <ms-modal to="body" :isOpen="true">
      <form @submit="onSubmit" class="modal-content rounded-md">
        <!-- head -->
        <div class="modal-head flex justify-between items-center">
            <slot name="head">
            <span class="text-2xl font-bold">Thêm tài sản</span>
            <span class="btn-close">
                <span class="icon close-icon"></span>
            </span>
            </slot>
        </div>

        <!-- content -->
         <div class="scroll modal-body flex flex-col gap-20">
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Mã tài sản"/>
                </div>
                <div class="col-span-2">
                    <ms-input size="large" isRequired label="Tên tài sản" placeholder="Nhập tên tài sản" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-select size="large" isRequired label="Mã bộ phận sử dụng" placeholder="Chọn mã bộ phận sử dụng"/>
                </div>
                <div class="col-span-2">
                    <ms-input size="large" label="Tên bộ phận sử dụng" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-select size="large" isRequired label="Mã loại tài sản" placeholder="Chọn mã loại tài sản"/>
                </div>
                <div class="col-span-2">
                    <ms-input size="large" label="Tên loại tài sản" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input type="number" isRequired size="large" label="Số lượng" placeholder=""/>
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Nguyên giá" placeholder="" />
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Tỷ lệ hao mòn (%)" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Ngày mua" placeholder=""/>
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Ngày bắt đầu sử dụng" placeholder="" />
                </div>
                <div class="col-span-1">
                    <ms-input size="large" label="Năm theo dõi" placeholder="" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-16">
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Số năm sử dụng" placeholder=""/>
                </div>
                <div class="col-span-1">
                    <ms-input size="large" isRequired label="Giá trị hao mòn năm" placeholder="" />
                </div>
               
            </div>
         </div>

         <!-- footer -->
         <div class="modal-footer flex justify-end items-center">
        <slot name="footer">
          <ms-button type="secondary" size="large" @click="emit('update:isOpen', false)">hủy</ms-button>
          <ms-button type="primary" size="large">Lưu</ms-button>
        </slot>
      </div>
      </form>
    </ms-modal>
  </template>
  
  <script setup>
  import MsModal from '@/components/ms-modal/MsModal.vue'
  //#region Props
   defineProps({
    isOpen: Boolean,
    candidate: Object,
    mode: String,
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
  