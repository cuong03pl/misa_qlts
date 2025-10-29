import * as yup from 'yup'

export const assetSchema = (t) => {
  return yup.object({
    assetCode: yup.string().required(t('asset.errors.assetCode_required')),
    assetName: yup.string().required(t('asset.errors.assetName_required')),
    assetTypeName: yup.string().required(t('asset.errors.assetTypeName_required')),
    departmentName: yup.string().required(t('asset.errors.departmentName_required')),
    quantity: yup.number().required(t('asset.errors.quantity_required')).typeError(t('asset.errors.number_invalid')),
    purchaseDate: yup.date().required(t('asset.errors.purchaseDate_required')).typeError(t('asset.errors.date_invalid')),
    price: yup.number().required(t('asset.errors.price_required')).typeError(t('asset.errors.number_invalid')),
    annualDepreciation: yup.number().required(t('asset.errors.annualDepreciation_required')).typeError(t('asset.errors.number_invalid')),
    residualValue: yup.number().required(t('asset.errors.residualValue_required')).typeError(t('asset.errors.number_invalid')),
    startUseDate: yup.date().required(t('asset.errors.startUseDate_required')).typeError(t('asset.errors.date_invalid')),
    useYears: yup.number().required(t('asset.errors.useYears_required')).typeError(t('asset.errors.number_invalid')),
    
  })
}
