<template>
    <div class="table-container">
        <DataTable
        :value="products"
        paginator 
          :rows="20"
          scrollable
          scrollHeight="flex"
          showGridlines
          tableStyle="min-width: 50rem">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column v-for="item in assetHeader" :key="item.field" :field="item.field" :header="item.title">
                <!-- Xử lý format theo type -->
                <template #body="{ data }">
                    <slot  :value="formatter[item.type](data[item.field])" :rowData="data" :name="`cell-${item.field}`">
                        {{ formatter[item.type](data[item.field]) }}
                    </slot>
                </template>
            </Column>
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
    quantity: 2,
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
  border: none !important;
}
.p-datatable-table-container {
  overflow: auto !important;
}
</style>