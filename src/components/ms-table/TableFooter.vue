<template>
  <div class="footer">
    <div class="total-records">
      <span
        >Tổng số: <span class="total-records-count">{{ totalRecords }}</span> bản ghi</span
      >
    </div>
    <Paginator
      template=" RowsPerPageDropdown PrevPageLink PageLinks NextPageLink "
      :rows="pageSize"
      :totalRecords="totalRecords"
      :first="first"
      :rowsPerPageOptions="[10, 20, 30]"
      :currentPage="currentPage"
      @page="onPageChange"
    >
      <template #previcon>
        <span class="icon prev-icon"></span>
      </template>
      <template #nexticon>
        <span class="icon next-icon"></span>
      </template>

      <template #rowsperpagedropdownicon>
        <span class="icon dropdown-icon"></span>
      </template>
    </Paginator>
  </div>
</template>

<script setup>
import Paginator from 'primevue/paginator'
//#region Props
defineProps({
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalRecords: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  first: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:pageSize', 'update:currentPage', 'pageChange'])

/**
 * Xử lý sự kiện khi thay đổi trang
 * @param {Object} event - Sự kiện pagination
 */
const onPageChange = (event) => {
  emit('pageChange', {
    pageSize: event.rows,
    pageNumber: event.page + 1,
  })
}
//#endregion Props
</script>

<style>
.footer {
  display: flex;
  align-items: center;
  padding-left: 8px !important;
}
.total-records {
  font-size: 11px;
  color: var(--text-color);
  width: 133px;
}
.total-records-count {
  font-weight: 700;
  font-size: 11px;
}
.p-paginator {
  justify-content: flex-start !important;
  padding: 0 !important;
}
.p-paginator-content {
  flex-wrap: nowrap !important;
  gap: 0px !important;
}
.p-paginator-current {
  display: block !important;
  font-size: 11px !important;
  color: var(--text-color) !important;
}

.p-select.p-component.p-inputwrapper.p-inputwrapper-filled.p-paginator-rpp-dropdown {
  padding: 6px 0 6px 14px !important;
  height: 25px !important;
  width: 59px !important;
  margin-right: 20px !important;
  border: 1px solid #afafaf !important;
  border-radius: 2.625px !important;
}
.p-paginator .p-component .p-select-label {
  font-size: 11px !important;
  font-style: normal !important;
}
.p-paginator-next,
.p-paginator-prev,
.p-paginator-page {
  height: 20px !important;
  width: 20px !important;
  min-width: 20px !important;
}

.p-paginator-pages {
  gap: 7px !important;
  margin: 0px 10px !important;
}
.p-paginator-page {
  font-size: 11px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--text-color) !important;
}
.p-paginator-page-selected {
  background-color: #f5f5f5 !important;
  border-radius: 3px !important;
  font-weight: 700 !important;
  color: var(--text-color) !important;
}

.p-paginator .p-select .p-select-dropdown {
  width: 20px !important;
}
</style>
