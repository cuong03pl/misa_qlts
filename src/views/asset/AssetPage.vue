<template>
  <div class="content p-6">
    <!-- head -->
    <div class="flex justify-between create-button items-center">
      <div class="flex items-center gap-11">
       <ms-search placeholder="Tìm kiếm tài sản" />
        <ms-select  placeholder="Loại tài sản" />
        <ms-select  placeholder="Bộ phận sử dụng" />
      </div>
      <div class="flex items-center gap-12">
        <ms-button
          v-if="selectedRows.length > 0"
          type="delete"
          size="large"
          @click="hanleToggleModalConfirm"
        >
          <i class="fa-solid fa-trash-can"></i>
        </ms-button>
        <ms-button type="combo" size="large" @click="hanleToggleModal">
          <template #left-icon>
            <i class="fa-solid fa-plus text-white"></i>
          </template>
          <span class="text-white text-btn">{{ t('common.button.add', { msg: 'ứng viên' }) }}</span>
          <template #right-icon>
            <div class="flex items-center justify-between">
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </template>
        </ms-button>
      </div>
    </div>
    <!-- body -->
    <div class="data-section py-5 mt-5 rounded-md">
      <!-- filter -->
      <div class="filter flex justify-end px-5">
        <div class="flex gap-12">
          
        </div>
      </div>

      <!-- table -->
      <div class="table mt-5 flex flex-col">
      </div>
    </div>
  </div>
 
  
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

//#endregion Methods
//#region State
const selectedRows = ref([])

//#endregion State

//#region Watchers

//#endregion Watchers
</script>

<style scoped>
.content {
  flex: 1;
  background: #ecebf0;
  transition: all 0.3s ease;
}

.content.collapsed {
  /* width: 100%; */
  background: #ecebf0;
  transition: all 0.3s ease;
}

.data-section {
  background: #fff;
}

/* table */

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
</style>
