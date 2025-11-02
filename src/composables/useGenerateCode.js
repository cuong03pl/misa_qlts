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
   */
  const generateCode = async () => {
    try {
      const response = await AssetAPI.generateNewCode()
      return response.data
    } catch (error) {
      showError(error, t('asset.generateCodeError'))
      throw error
    }
  }

  return {
    generateCode,
  }
}