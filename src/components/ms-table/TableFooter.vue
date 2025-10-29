<template>
  <div class="footer px-5 pt-5">
    <div class="footer-left">
      Tổng: <span>{{ count }}</span> bản ghi
    </div>
    <div class="footer-right">
      <div class="page-size">
        <span>Số bản ghi/trang</span>
        <select>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div class="page-size">
        <span>1 - 25 bản ghi</span>
      </div>
      <div class="pagination">
        <ms-button disabled>
          <i class="fa-solid fa-chevron-left"></i>
        </ms-button>
        <ms-button><i class="fa-solid fa-chevron-right"></i></ms-button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 0,
  },
})
</script>

<style>
/* footer table*/
.table .footer {
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-left {
  font-size: 14px;
  color: var(--text-color);
}

.footer-left span {
  font-weight: 600;
  color: var(--text-color);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-size {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-color);
}

.page-size select {
  padding: 4px 8px;
  border: 1px solid var(--border-secondary);
  border-radius: 4px;
  font-size: 14px;
}

.pagination {
  display: flex;
  gap: 8px;
}

.pagination button {
  padding: 4px 12px;
  border: 1px solid var(--border-secondary);
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.pagination button:hover {
  background: #f9fafb;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
