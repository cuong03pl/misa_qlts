<template>
  <div class="table-container">
    <ContextMenu ref="cm" :model="menuModel" />
    <DataTable
      v-if="rows?.length > 0"
      v-model:contextMenuSelection="selectedData"
      @rowContextmenu="onRowContextMenu"
      contextMenu
      columnResizeMode="expand"
      :value="rows"
      scrollable
      scrollHeight="flex"
      showGridlines
      resizableColumns="true"
      size="small"
      tableStyle="min-width: 50rem"
      :dataKey="dataKey"
      v-model:selection="selectedData"
      @rowClick="onRowClick"
      selectionMode="multiple"
      :metaKeySelection="true"
    >
      <!-- removableSort -->
      <Column colspan="1" selectionMode="multiple" class="checkbox-cell"></Column>
      <!-- sortable -->
      <Column
        colspan="1"
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
      <Column field="func" :header="t('table.function')">
        <template #body="{ index }">
          <div class="flex justify-center gap-12 function-icons">
            <span class="icon edit-icon" @click="onEditClick(rows[index])"></span>
            <span class="icon duplicate-icon" @click="onDuplicateClick(rows[index])"></span>
          </div>
        </template>
      </Column>
      <slot name="footer"> </slot>
    </DataTable>
    <ms-empty v-if="rows?.length === 0" message="Không có dữ liệu" />
  </div>
</template>

<script  setup>
import { computed, ref, watch } from 'vue'
import { getAssetHeader } from '@/constants/assetHeader'
import { formatter } from '@/utils/formatter'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ContextMenu } from 'primevue'
import { useI18n } from 'vue-i18n'
//#region Props
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  dataKey: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})
//#endregion Props

//#region Emits
const emit = defineEmits(['update:modelValue', 'edit', 'delete', 'duplicate'])
//#endregion Emits

//#region State
// Hàm xử lý khi click vào dòng
const cm = ref()
const { t } = useI18n()
const assetHeader = computed(() => getAssetHeader(t))
const selectedRowIndex = ref(null)
const selectedData = ref([])
const menuModel = ref([
  { label: t('table.edit'), command: () => onEditClick(selectedData.value[0]) },
  { label: t('table.duplicate'), command: () => onDuplicateClick(selectedData.value[0]) },
  {
    label: t('table.delete'),
    command: () => onDeleteClick(selectedData.value),
  },
])

const onRowContextMenu = (event) => {
  selectedData.value = [event.data]
  cm.value.show(event.originalEvent)
}
// Xử lý đồng bộ selected
watch(
  () => props.modelValue,
  (newVal) => {
    selectedData.value = newVal
  },
  { immediate: true }
)

const onRowClick = (event) => {
  selectedRowIndex.value = event.index
}

const onDeleteClick = (rowData) => {
  emit('delete', rowData)
}
/**
 * Hàm xử lý khi click vào icon edit truyền data về page chính
 * @param {Object} rowData - Dữ liệu của dòng được click
 */
const onEditClick = (rowData) => {
  emit('edit', rowData)
}

const onDuplicateClick = (rowData) => {
  emit('duplicate', rowData)
}

// Truyền select data ra ngoài
watch(selectedData, (newVal) => {
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
  padding-right: 8px !important;
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
.p-datatable-thead {
  background-color: #f5f5f5 !important;
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

.p-datatable-gridlines .p-datatable-tfoot > tr > td {
  border-width: 1px 0 0px 0px !important;
}

.p-datatable-tfoot {
  height: 39px !important;
  padding: 0 16px !important;
}

.function-icons {
  display: none !important;
}

.p-datatable .p-datatable-tbody > tr:hover .function-icons {
  display: flex !important;
}
/*  custom background của dòng được chọn */
.p-datatable-tbody > tr:focus-visible,
.p-datatable-tbody > tr.p-datatable-contextmenu-row-selected {
  background-color: rgba(26, 164, 200, 0.2) !important;
}

.p-datatable-tbody tr[aria-selected='true'] {
  background-color: rgba(26, 164, 200, 0.2) !important;
  color: #fff !important;
}
</style>