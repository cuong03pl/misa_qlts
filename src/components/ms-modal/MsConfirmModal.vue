<template>
    <ms-modal :isOpen="isOpenConfirmModal" to="body">
      <div class="modal-content rounded-md">
              <div class="modal-head  flex justify-between items-center">
                
                <h3 class="text-2xl font-bold"></h3>
                <span @click="emit('update:isOpenConfirmModal', false)" class="btn-close"
                  ><i class="fa-solid fa-xmark"></i
                ></span>
              </div>
              <div class="modal-body">
                <slot name="content"> </slot>
              </div>
              <div class="modal-footer flex justify-end ">
                <slot name="footer">
                  <ms-button type="secondary" size="medium">{{
                    
                  }}</ms-button>
                  <ms-button type="delete" size="medium">{{
                  
                  }}</ms-button>
                </slot>
              </div>
      </div>
    </ms-modal>
  </template>
  
  <script setup>
  import MsModal from './MsModal.vue'
  
  
  //#region Props
  defineProps({
    isOpenConfirmModal: Boolean,
  })
  //#endregion Props
  
  //#region Emits
  const emit = defineEmits(['update:isOpenConfirmModal'])
  //#endregion Emits
  </script>
  
  <style >
  /* Modal xác nhận xóa */
  
  
  
  </style>
  