<template>
  <div class="content p-6">
    <!-- head -->
    <div class="flex justify-between create-button items-center">
      <div class="flex items-center gap-11">
       <ms-search placeholder="Tìm kiếm tài sản" />
        <ms-select  placeholder="Loại tài sản" />
        <ms-select  placeholder="Bộ phận sử dụng" />
      </div>
      <div class="flex items-center gap-10">
        <ms-button type="one-icon" size="large">
          <template #left-icon>
            <span class="icon plus-icon"></span>
          </template>
          <span>Thêm tài sản</span>
        </ms-button>
        <ms-button type="only-icon" size="large">
          <template #left-icon>
            <span class="icon excel-icon"></span>
          </template>
        </ms-button>
        <ms-button type="only-icon" size="large">
          <template #left-icon>
            <span class="icon delete-icon-red"></span>
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
