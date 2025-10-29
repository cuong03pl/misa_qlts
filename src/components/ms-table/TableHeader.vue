<template>
  <thead class="table-head">
    <tr>
      <th v-show="hasCheckbox" style="width: 48px">
        <input
          :checked="checked"
          @change="emit('toggleSelectAll')"
          type="checkbox"
          id="selectAll"
        />
      </th>
      <th  v-for="(item, index) in data" :key="index">
          <span>{{ item.title }}</span>
      </th>


      <!-- Option có filter -->
      <!-- <th  class="cell-head" v-for="(item, index) in data" :key="index">
        <div class="flex justify-between">
          <span>{{ item.title }}</span>
          <ms-button v-if="item.hasFilter" >
            <i class="fa-solid fa-arrow-down"></i>
          </ms-button>
        </div>
      </th> -->
    </tr>
  </thead>
</template>

<script setup>
//#region Props
defineProps({
  hasCheckbox: Boolean,
  data: Array,
  checked: Boolean,
})
//#endregion Props

//#region Emits
const emit = defineEmits(['toggleSelectAll'])
//#endregion Emits
</script>

<style scoped>
thead {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  position: sticky;
  top: -5px;
  z-index: 10;
}

th {
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;

}
input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.table-head {
  background: #f1f0f0;
}

/* Option có filter */
.cell-head {
  min-width: 200px;
}
</style>
