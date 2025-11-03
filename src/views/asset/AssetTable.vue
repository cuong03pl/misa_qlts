<template>
  <MsTableV2
    dataKey="assetCode"
    :modelValue="selectedAssets"
    @update:modelValue="(value) => $emit('update:selectedAssets', value)"
    scrollHeight="400px"
    :rows="assets?.data"
    @edit="(asset) => $emit('edit', asset)"
    @duplicate="(asset) => $emit('duplicate', asset)"
    @delete="(asset) => $emit('delete', asset)"
    @add="$emit('add')"
    :header="header"
  >
    <template v-if="assets?.data?.length > 0" #footer>
      <ColumnGroup type="footer">
        <Row>
          <!-- pagination -->
          <Column :colspan="6">
            <template #footer>
              <table-footer
                :totalRecords="totalRecords"
                :pageSize="pageSize"
                @update:pageSize="(value) => $emit('update:pageSize', value)"
                :currentPage="pageNumber"
                @update:currentPage="(value) => $emit('update:pageNumber', value)"
                @pageChange="handlePageChange"
                :first="(pageNumber - 1) * pageSize"
              />
            </template>
          </Column>
          <!-- tổng số lượng-->
          <Column
            :footer="formatter.currency(assets.quantityTotal)"
            footerStyle="text-align:end; vertical-align: middle; font-size: 13px; font-weight: 700;"
          ></Column>

          <!-- tổng nguyên giá -->
          <Column
            :footer="formatter.currency(assets.priceTotal)"
            footerStyle="text-align:end; vertical-align: middle; font-size: 13px; font-weight: 700;"
          />
          <!-- tổng khấu hao năm -->
          <Column
            :footer="formatter.currency(assets.annualDepreciationTotal)"
            footerStyle="text-align:end; vertical-align: middle; font-size: 13px; font-weight: 700;"
          />
          <!-- tổng giá trị còn lại -->
          <Column
            :footer="formatter.currency(assets.remainingValueTotal)"
            footerStyle="text-align:end; vertical-align: middle; font-size: 13px; font-weight: 700;"
          />
          <Column colspan="1" />
        </Row>
      </ColumnGroup>
    </template>
  </MsTableV2>
</template>

<script setup>
import MsTableV2 from '@/components/ms-table/MsTableV2.vue'
import { Column, ColumnGroup, Row } from 'primevue'
import TableFooter from '@/components/ms-table/TableFooter.vue'
import { formatter } from '@/utils/formatter'

//#region Props
defineProps({
  assets: {
    type: Object,
    default: () => ({}),
  },
  selectedAssets: {
    type: Array,
    default: () => [],
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
  header: {
    type: Array,
    default: () => [],
  },
})
//#endregion Props

//#region Emits
const emit = defineEmits([
  'update:selectedAssets',
  'update:pageSize',
  'update:pageNumber',
  'pageChange',
  'edit',
  'duplicate',
  'delete',
  'add',
])
//#endregion Emits

//#region Methods
/**
 * Xử lý thay đổi trang
 * @param {Object} pageInfo - Thông tin trang
 * createdby: HK Cường
 */
const handlePageChange = (pageInfo) => {
  emit('pageChange', pageInfo)
}
//#endregion Methods
</script>

<style scoped>
</style>