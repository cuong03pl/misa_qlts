<template>
  <ms-modal :isOpen="isOpenConfirmModal" to="body">
    <div class="modal-confirm-content rounded-md">
      <div class="modal-confirm-body">
        <div class="">
          <span class="icon warning-icon"></span>
        </div>
        <div style="line-height: 1.8" class="text-sm text-gray-500">
          <slot name="content"> </slot>
        </div>
      </div>
      <div class="modal-confirm-footer flex justify-end">
        <slot name="footer">
          <ms-button type="outline" size="medium">Không</ms-button>
          <ms-button type="primary" size="medium">Hủy bỏ</ms-button>
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
.modal-confirm-content {
  width: 400px;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-confirm-body {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 36px 30px;
}
.modal-confirm-footer {
  height: 52px;
  padding: 0 20px 16px 20px;
  gap: 10px;
}
</style>
  