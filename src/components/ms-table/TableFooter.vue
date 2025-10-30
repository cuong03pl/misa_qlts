<template>
  <div class="footer">
    <div class="total-records">
      <span
        >Tổng số: <span class="total-records-count">{{ count }}</span> bản ghi</span
      >
    </div>
    <Paginator
      template=" RowsPerPageDropdown PrevPageLink PageLinks NextPageLink "
      :rows="10"
      :totalRecords="120"
      :rowsPerPageOptions="[10, 20, 30]"
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
  count: {
    type: Number,
    default: 0,
  },
})
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
  min-width: 150px !important;
  display: block !important;
  font-size: 11px !important;
  color: var(--text-color) !important;
}

.p-select.p-component.p-inputwrapper.p-inputwrapper-filled.p-paginator-rpp-dropdown {
  padding: 6px 0 6px 14px !important;
  height: 25px !important;
  width: 59px !important;
  margin-right: 20px !important;
  margin-left: 30px !important;
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
