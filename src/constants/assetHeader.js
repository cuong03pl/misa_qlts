/**
 * Header cho bảng tài sản
 * @param {*} t - i18n
 * @returns {Array} - Header cho bảng tài sản
 */
export const getAssetHeader = (t) => [
    {
      field: 'rowIndex',
      title: t('table.rowIndex'),
      type: 'number',
    },
    {
      field: 'assetCode',
      title: t('table.assetCode'),
      type: 'text',
    },
    {
      field: 'assetName',
      title: t('table.assetName'),
      type: 'text',
    },
    {
        field: 'assetTypeName',
        title: t('table.assetTypeName'),
        type: 'text',
      },
      {
        field: 'departmentName',
        title: t('table.departmentName'),
        type: 'text',
      },
      {
        field: 'quantity',
        title: t('table.quantity'),
        type: 'number',
      },
    // {
    //   field: 'purchaseDate',
    //   title: 'Ngày mua',
    //   type: 'date',
    // },
    
    {
      field: 'price',
      title: t('table.price'),
      type: 'currency',
    },
    {
      field: 'annualDepreciation',
      title: t('table.annualDepreciation'),
      type: 'currency',
    },
    {
      field: 'residualValue',
      title: t('table.residualValue'),
      type: 'currency',
    }
    
   
  ]
  