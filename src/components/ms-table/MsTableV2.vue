<template>
  <div class="table-container">
    <DataTable
      :value="rows"
      paginator
      :rows="20"
      scrollable
      scrollHeight="flex"
      showGridlines
      resizableColumns="true"
      size="small"
      tableStyle="min-width: 50rem"
      dataKey="assetCode"
      totalRecords="23"
      :rowsPerPageOptions="[20, 50, 100]"
      v-model:selection="selectedAssets"
      paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      RowsPerPageDropdown=""
      currentPageReportTemplate="Tổng: {totalRecords} bản ghi"
      @rowClick="onRowClick"
    >
      <Column selectionMode="multiple" class="checkbox-cell"></Column>
      <Column
        v-for="item in assetHeader"
        :key="item.field"
        :field="item.field"
        :header="item.title"
        :pt="{
          bodyCell: { 'data-type': item.type },
          headerCell: { 'data-type': item.type },
        }"
      >
        <!-- Xử lý format theo type -->
        <template #body="{ data }">
          <slot
            :value="formatter[item.type](data[item.field])"
            :rowData="data"
            :name="`cell-${item.field}`"
          >
            {{ formatter[item.type](data[item.field]) }}
          </slot>
        </template>
      </Column>
      <Column field="func" header="Chức năng">
        <template #body="{ index }">
          <div v-if="selectedRowIndex === index" class="flex justify-center gap-12">
            <span class="icon edit-icon"></span>
            <span class="icon duplicate-icon"></span>
          </div>
        </template>
      </Column>

      <template #paginatorend> </template>
    </DataTable>
  </div>
</template>

<script  setup>
import { ref, watch } from 'vue'
import { assetHeader } from '@/constants/assetHeader'
import { formatter } from '@/utils/formatter'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineProps({
  rows: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
// Hàm xử lý khi click vào dòng
const selectedRowIndex = ref(null)
const selectedAssets = ref([])

const onRowClick = (event) => {
  selectedRowIndex.value = event.index
}

watch(selectedAssets, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style>
.table-container {
  flex: 1;
  overflow: hidden;
  margin: 0 20px 17px 20px;
  border: 1px solid #afafaf;
  border-radius: 3.5px;
  background-color: var(--white-color);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}

.table-container .p-datatable {
  width: 100%;
}

.p-datatable .p-datatable-tbody > tr > td {
  white-space: nowrap;
}
.p-datatable-column-title {
  white-space: nowrap;
}
.p-datatable-gridlines .p-datatable-thead > tr > th {
  border: none;
}
.p-datatable-tbody > tr > td {
  font-size: 13px;
  color: var(--text-color);
  vertical-align: middle;
}
.p-datatable-table-container {
  overflow: auto !important;
}

th.p-datatable-header-cell {
  height: 38px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  vertical-align: middle;
}

.p-datatable-column-header-content {
  height: 100%;
  display: flex !important;
  align-items: center;
  justify-content: inherit;
  line-height: 1;
}

.checkbox-cell {
  padding: 0 !important;
  padding-left: 16px !important;
}

.checkbox-cell .p-datatable-column-header-content {
  display: flex !important;
}

.p-checkbox-box {
  border: 1px solid #090f39 !important;
}

.p-checkbox-box,
.p-checkbox.p-component {
  width: 14px !important;
  height: 14px !important;
}

.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody)
  .p-datatable-tbody
  > tr
  > td {
  border-width: 1px 0 0px 0px !important;
}

.p-datatable-tbody > tr {
  height: 39px !important;
  vertical-align: middle;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background-color: rgba(26, 164, 200, 0.2) !important;
}

.p-datatable .p-datatable-tbody > tr.p-highlight {
  background-color: rgba(26, 164, 200, 0.2) !important;
}

/* text - Căn trái, number - Căn phải, currency - Căn phải, date - Căn giữa */

.p-datatable-tbody td[data-type='text'],
.p-datatable-thead th[data-type='text'] {
  text-align: left !important;
}

.p-datatable-tbody td[data-type='number'],
.p-datatable-tbody td[data-type='currency'],
.p-datatable-thead th[data-type='number'],
.p-datatable-thead th[data-type='currency'] {
  text-align: right !important;
}

.p-datatable-tbody td[data-type='date'],
.p-datatable-thead th[data-type='date'] {
  text-align: center !important;
}
.p-datatable-column-header-content {
  display: block !important;
}

span.p-datatable-column-title {
  display: inline-flex;
  align-items: center;
  height: 100%;
  font-size: 13px;
  font-weight: bold;
}
.p-checkbox-input {
  border-radius: 1px !important;
}
.p-checkbox-box {
  border-radius: 2px !important;
}
.p-checkbox-checked .p-checkbox-box {
  background-color: var(--btn-primary) !important;
  border: transparent !important;
}
.p-checkbox-icon {
  height: 10px !important;
  width: 10px !important;
}

/* Force scroll chỉ ở body */
:deep(.p-datatable-wrapper) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:deep(.p-datatable-thead-wrapper) {
  flex-shrink: 0;
  overflow: hidden !important;
}

:deep(.p-datatable-tbody-wrapper) {
  flex: 1;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

:deep(.p-datatable-tfoot-wrapper) {
  flex-shrink: 0;
  overflow: hidden !important;
}

/* Hoặc với scrollable */
:deep(.p-datatable.p-datatable-scrollable > .p-datatable-wrapper) {
  overflow: hidden;
}

:deep(.p-datatable-scrollable-body) {
  overflow-y: auto !important;
}

:deep(.p-datatable-scrollable-header),
:deep(.p-datatable-scrollable-footer) {
  overflow: visible !important;
}
</style>