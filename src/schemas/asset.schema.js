import * as yup from 'yup'

export const assetSchema = (t) => {
  return yup.object({
    assetCode: yup.string().required(t('asset.errors.assetCode_required')).max(20, t('asset.errors.assetCode_max')),
    assetName: yup.string().required(t('asset.errors.assetName_required')).max(255, t('asset.errors.assetName_max'))  ,
    assetTypeName: yup.object().required(t('asset.errors.assetTypeName_required')),
    departmentName: yup.object().required(t('asset.errors.departmentName_required')),
    quantity: yup.number().required(t('asset.errors.quantity_required')).typeError(t('asset.errors.number_invalid')).positive(t('asset.errors.quantity_positive')),
    purchaseDate: yup.date().required(t('asset.errors.purchaseDate_required')).typeError(t('asset.errors.date_invalid')),
    price: yup.number().required(t('asset.errors.price_required')).typeError(t('asset.errors.number_invalid')).positive(t('asset.errors.price_positive')),
    annualDepreciation: yup.number().required(t('asset.errors.annualDepreciation_required')).typeError(t('asset.errors.number_invalid')).positive(t('asset.errors.annualDepreciation_positive')),
    depreciationRate: yup.number().required(t('asset.errors.depreciationRate_required')).typeError(t('asset.errors.number_invalid')).positive(t('asset.errors.depreciationRate_positive')),
    startDate: yup.date().required(t('asset.errors.startDate_required')).typeError(t('asset.errors.date_invalid')),
    useYears: yup.number().required(t('asset.errors.useYears_required')).typeError(t('asset.errors.number_invalid')).positive(t('asset.errors.useYears_positive')),
    
  })
}
