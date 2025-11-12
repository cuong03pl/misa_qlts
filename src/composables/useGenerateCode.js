import { useI18n } from 'vue-i18n'
import AssetAPI from '@/apis/components/AssetAPI'
import { useToastNotification } from './useToastNotification'

/**
 * Composable tự động generate mã tài sản mới
 * createdby: hkc
 */
export const useGenerateCode = () => {
  const { t } = useI18n()
  const { showError } = useToastNotification()

  /**
   * Hàm generate mã tài sản mới từ API
   * @returns {Promise<string>} - Mã tài sản mới
   * createdby: HK Cường
   */
  const generateCode = async () => {
    try {
      const response = await AssetAPI.generateNewCode()
      if (response.data?.success) {
        return response.data
      } else {
        showError(response.data?.message, t('asset.generateCodeError'))
        return null
      }
    } catch (error) {
      showError(error, t('asset.generateCodeError'))
      return null
    }
  }

  return {
    generateCode,
  }
}