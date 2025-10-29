<template>
    <div class="table-container">
        <DataTable
        :value="products"
        paginator 
          :rows="20"
          scrollable
          scrollHeight="flex"
          showGridlines
          resizableColumns="true"
          size="small"
          tableStyle="min-width: 50rem">
            <Column selectionMode="multiple" class="checkbox-cell" ></Column>
            <Column v-for="item in assetHeader" :key="item.field" :field="item.field" :header="item.title" :pt="{
          bodyCell: { 'data-type': item.type },
          headerCell: { 'data-type': item.type }
        }">
                <!-- Xử lý format theo type -->
                <template #body="{ data }">
                    <slot  :value="formatter[item.type](data[item.field])" :rowData="data" :name="`cell-${item.field}`">
                        {{ formatter[item.type](data[item.field]) }}
                    </slot>
                </template>
            </Column>
            <Column field="func" header="Chức năng"></Column>
        </DataTable>
    </div>
</template>

<script  setup>
import { ref } from 'vue';
import { assetHeader } from '@/constants/assetHeader';
import { formatter } from '@/utils/formatter';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';             

// Dữ liệu mẫu
const products = ref([
  {
    STT: 1,
    assetCode: 'TS001',
    assetName: 'Máy tính Dell OptiPlex 7090',
    assetTypeName: 'Thiết bị vi tính',
    departmentName: 'Phòng IT',
    quantity: 1,
    purchaseDate: '2023-01-15',
    price: 15000000,
    annualDepreciation: 3000000
  },
  {
    STT: 2,
    assetCode: 'TS002', 
    assetName: 'Máy in HP LaserJet Pro M404n',
    assetTypeName: 'Thiết bị văn phòng',
    departmentName: 'Phòng hành chính',
    quantity: 2000,
    purchaseDate: '2023-02-20',
    price: 8500000,
    annualDepreciation: 1700000
  },
  {
    STT: 3,
    assetCode: 'TS003',
    assetName: 'Bàn làm việc gỗ tự nhiên',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng kế toán',
    quantity: 5,
    purchaseDate: '2023-03-10',
    price: 12000000,
    annualDepreciation: 2000000
  }
]);

</script>

<style>
.table-container {
 flex: 1;
 overflow: hidden;
 margin:  0 20px 17px 20px;
 border: 1px solid #afafaf;
 border-radius: 3.5px;
 background-color: var(--white-color);
 box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
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

.p-checkbox-box, .p-checkbox.p-component {
  width: 14px !important;
  height: 14px !important;
}

.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {
  border-width:  1px 0 0px 0px !important;
}

.p-datatable-tbody > tr {
  height: 39px !important;
  vertical-align: middle;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background-color: rgba(26, 164, 200, .2) !important;
}

.p-datatable .p-datatable-tbody > tr.p-highlight {
  background-color: rgba(26, 164, 200, .2) !important;
}

/* text - Căn trái, number - Căn phải, currency - Căn phải, date - Căn giữa */

.p-datatable-tbody td[data-type="text"],
.p-datatable-thead th[data-type="text"] {
  text-align: left !important;
}

.p-datatable-tbody td[data-type="number"], 
.p-datatable-tbody td[data-type="currency"],
.p-datatable-thead th[data-type="number"], 
.p-datatable-thead th[data-type="currency"] {
  text-align: right !important;
}

.p-datatable-tbody td[data-type="date"],
.p-datatable-thead th[data-type="date"] {
  text-align: center !important;
}
.p-datatable-column-header-content {
  display: block !important;
}

span.p-datatable-column-title {
  display: inline-flex;
  align-items: center;
  height: 100%;
}
</style>