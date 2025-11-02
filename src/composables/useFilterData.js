import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DepartmentAPI from '@/apis/components/DepartmentAPI'
import AssetTypeAPI from '@/apis/components/AssetTypeAPI'
import { useToastNotification } from './useToastNotification'

/**
 * Composable để quản lý dữ liệu filter (departments và assetTypes)
 * createdby: hkc
 */
export const useFilterData = () => {
  const { t } = useI18n()
  const { showError } = useToastNotification()

  const departments = ref([])
  const assetTypes = ref([])

  /**
   * Lấy tất cả dữ liệu departments và assetTypes
   * @returns {Promise<Object>} - Object chứa departments và assetTypes
   */
  const fetchFiltersData = async () => {
    try {
      const [departmentRes, assetTypeRes] = await Promise.all([
        DepartmentAPI.getAll(),
        AssetTypeAPI.getAll(),
      ])
      departments.value = departmentRes.data
      assetTypes.value = assetTypeRes.data

      return {
        departments: departmentRes.data,
        assetTypes: assetTypeRes.data,
      }
    } catch (error) {
      showError(error, t('asset.fetchFiltersError'))
      throw error
    } 
  }

  return {
    departments,
    assetTypes,
    fetchFiltersData,
  }
}

