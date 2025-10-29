import * as yup from 'yup'

export const assetSchema = (t) => {
  return yup.object({
    assetCode: yup.string().required(t('asset.errors.assetCode_required')),
    assetName: yup.string().required(t('asset.errors.assetName_required')),
    assetTypeName: yup.string().required(t('asset.errors.assetTypeName_required')),
    departmentName: yup.string().required(t('asset.errors.departmentName_required')),
    quantity: yup.number().required(t('asset.errors.quantity_required')),
    purchaseDate: yup.date().required(t('asset.errors.purchaseDate_required')),
    price: yup.number().required(t('asset.errors.price_required')),
    annualDepreciation: yup.number().required(t('asset.errors.annualDepreciation_required')),
    residualValue: yup.number().required(t('asset.errors.residualValue_required')),
    startUseDate: yup.date().required(t('asset.errors.startUseDate_required')),
    useYears: yup.number().required(t('asset.errors.useYears_required')),
    
  })
}
