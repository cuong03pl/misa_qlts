/**
 * Composable để tạo menu model cho table context menu
 * @param {Function} t - Hàm translation từ i18n
 * @param {Object} callbacks - Các callback functions
 * @param {Function} callbacks.onAdd - Callback khi click thêm mới
 * @param {Function} callbacks.onEdit - Callback khi click chỉnh sửa
 * @param {Function} callbacks.onDuplicate - Callback khi click nhân bản
 * @param {Function} callbacks.onDelete - Callback khi click xóa
 * @returns {Array} Menu model cho context menu
 */
export const tableMenuConfig = (t, callbacks) => {
  return [
    {
      label: t('table.add'),
      icon: '<span class="icon plus-icon-black"></span>',
      command: callbacks.onAdd,
    },
    {
      separator: true,
    },
    {
      label: t('table.edit'),
      icon: '<span class="icon edit-icon"></span>',
      command: callbacks.onEdit,
    },
    {
      separator: true,
    },
    {
      label: t('table.duplicate'),
      icon: '<span class="icon duplicate-icon"></span>',
      command: callbacks.onDuplicate,
    },
    {
      separator: true,
    },
    {
      label: t('table.delete'),
      icon: '<span class="icon delete-icon-black"></span>',
      command: callbacks.onDelete,
    },
  ]
}

