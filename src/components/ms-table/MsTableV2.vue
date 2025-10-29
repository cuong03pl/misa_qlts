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
          selectionMode="single"
          dataKey="assetCode"
          totalRecords="23"
          :rowsPerPageOptions='[20, 50, 100]'
           paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
           RowsPerPageDropdown=""
    currentPageReportTemplate="Tổng: {totalRecords} bản ghi"
          @rowClick="onRowClick">
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
            <Column  field="func" header="Chức năng">
                <template #body="{ index }">
                    <div v-if="selectedRowIndex === index" class="flex justify-center gap-12">
                        <span class="icon edit-icon"></span>
                        <span class="icon duplicate-icon"></span>
                    </div>
                </template>
            </Column>

            <template #paginatorend>
             
            </template>
            
        </DataTable>
    </div>
</template>

<script  setup>
import { ref } from 'vue';
import { assetHeader } from '@/constants/assetHeader';
import { formatter } from '@/utils/formatter';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';             

const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
})

// Hàm xử lý khi click vào dòng
const selectedRowIndex = ref(null);

const onRowClick = (event) => {
    selectedRowIndex.value = event.index;
};

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
  },
  {
    STT: 4,
    assetCode: 'TS004',
    assetName: 'Máy chiếu Epson EB-X51',
    assetTypeName: 'Thiết bị hội họp',
    departmentName: 'Phòng họp',
    quantity: 2,
    purchaseDate: '2023-04-05',
    price: 9500000,
    annualDepreciation: 1900000
  },
  {
    STT: 5,
    assetCode: 'TS005',
    assetName: 'Laptop HP Elitebook 840 G8',
    assetTypeName: 'Thiết bị vi tính',
    departmentName: 'Phòng kinh doanh',
    quantity: 3,
    purchaseDate: '2023-04-12',
    price: 22000000,
    annualDepreciation: 4400000
  },
  {
    STT: 6,
    assetCode: 'TS006',
    assetName: 'Tủ tài liệu gỗ công nghiệp',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng nhân sự',
    quantity: 4,
    purchaseDate: '2023-05-03',
    price: 5600000,
    annualDepreciation: 1120000
  },
  {
    STT: 7,
    assetCode: 'TS007',
    assetName: 'Điều hòa Panasonic Inverter 12000BTU',
    assetTypeName: 'Thiết bị điện lạnh',
    departmentName: 'Phòng giám đốc',
    quantity: 1,
    purchaseDate: '2023-05-15',
    price: 11200000,
    annualDepreciation: 2240000
  },
  {
    STT: 8,
    assetCode: 'TS008',
    assetName: 'Ghế xoay văn phòng cao cấp',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng giám đốc',
    quantity: 1,
    purchaseDate: '2023-06-02',
    price: 3500000,
    annualDepreciation: 700000
  },
  {
    STT: 9,
    assetCode: 'TS009',
    assetName: 'Máy scan Fujitsu ScanSnap iX1600',
    assetTypeName: 'Thiết bị văn phòng',
    departmentName: 'Phòng kế toán',
    quantity: 1,
    purchaseDate: '2023-06-10',
    price: 7800000,
    annualDepreciation: 1560000
  },
  {
    STT: 10,
    assetCode: 'TS010',
    assetName: 'Bộ bàn ghế họp 10 người',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng họp',
    quantity: 1,
    purchaseDate: '2023-07-05',
    price: 18500000,
    annualDepreciation: 3700000
  },
  {
    STT: 11,
    assetCode: 'TS011',
    assetName: 'Máy lọc nước RO Kangaroo',
    assetTypeName: 'Thiết bị sinh hoạt',
    departmentName: 'Khu vực chung',
    quantity: 2,
    purchaseDate: '2023-07-15',
    price: 6500000,
    annualDepreciation: 1300000
  },
  {
    STT: 12,
    assetCode: 'TS012',
    assetName: 'Máy photocopy Ricoh MP 3554',
    assetTypeName: 'Thiết bị văn phòng',
    departmentName: 'Phòng hành chính',
    quantity: 1,
    purchaseDate: '2023-08-01',
    price: 32000000,
    annualDepreciation: 6400000
  },
  {
    STT: 13,
    assetCode: 'TS013',
    assetName: 'Tủ lạnh Panasonic 180L',
    assetTypeName: 'Thiết bị sinh hoạt',
    departmentName: 'Khu vực chung',
    quantity: 1,
    purchaseDate: '2023-08-10',
    price: 5800000,
    annualDepreciation: 1160000
  },
  {
    STT: 14,
    assetCode: 'TS014',
    assetName: 'Màn hình Dell UltraSharp 27"',
    assetTypeName: 'Thiết bị vi tính',
    departmentName: 'Phòng thiết kế',
    quantity: 4,
    purchaseDate: '2023-09-05',
    price: 7200000,
    annualDepreciation: 1440000
  },
  {
    STT: 15,
    assetCode: 'TS015',
    assetName: 'Máy hút ẩm Daikin 12L/ngày',
    assetTypeName: 'Thiết bị điện lạnh',
    departmentName: 'Phòng server',
    quantity: 2,
    purchaseDate: '2023-09-15',
    price: 4800000,
    annualDepreciation: 960000
  },
  {
    STT: 16,
    assetCode: 'TS016',
    assetName: 'Camera an ninh Hikvision bộ 8 mắt',
    assetTypeName: 'Thiết bị an ninh',
    departmentName: 'Toàn công ty',
    quantity: 1,
    purchaseDate: '2023-10-01',
    price: 15600000,
    annualDepreciation: 3120000
  },
  {
    STT: 17,
    assetCode: 'TS017',
    assetName: 'Bàn làm việc module 4 người',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng marketing',
    quantity: 2,
    purchaseDate: '2023-10-10',
    price: 9200000,
    annualDepreciation: 1840000
  },
  {
    STT: 18,
    assetCode: 'TS018',
    assetName: 'Máy đếm tiền Xiudun 5688',
    assetTypeName: 'Thiết bị văn phòng',
    departmentName: 'Phòng kế toán',
    quantity: 1,
    purchaseDate: '2023-11-05',
    price: 3800000,
    annualDepreciation: 760000
  },
  {
    STT: 19,
    assetCode: 'TS019',
    assetName: 'Máy pha cà phê tự động DeLonghi',
    assetTypeName: 'Thiết bị sinh hoạt',
    departmentName: 'Phòng giải lao',
    quantity: 1,
    purchaseDate: '2023-11-15',
    price: 12500000,
    annualDepreciation: 2500000
  },
  {
    STT: 20,
    assetCode: 'TS020',
    assetName: 'Bộ lưu điện UPS APC 10KVA',
    assetTypeName: 'Thiết bị điện',
    departmentName: 'Phòng server',
    quantity: 1,
    purchaseDate: '2023-12-01',
    price: 45000000,
    annualDepreciation: 9000000
  },
  {
    STT: 21,
    assetCode: 'TS021',
    assetName: 'Tủ sắt đựng tài liệu 4 ngăn',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng lưu trữ',
    quantity: 3,
    purchaseDate: '2023-12-10',
    price: 4200000,
    annualDepreciation: 840000
  },
  {
    STT: 22,
    assetCode: 'TS022',
    assetName: 'Máy hủy tài liệu HSM Securio C18',
    assetTypeName: 'Thiết bị văn phòng',
    departmentName: 'Phòng hành chính',
    quantity: 1,
    purchaseDate: '2024-01-05',
    price: 5400000,
    annualDepreciation: 1080000
  },
  {
    STT: 23,
    assetCode: 'TS023',
    assetName: 'Bộ bàn ghế tiếp khách',
    assetTypeName: 'Nội thất văn phòng',
    departmentName: 'Phòng tiếp khách',
    quantity: 1,
    purchaseDate: '2024-01-15',
    price: 14500000,
    annualDepreciation: 2900000
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