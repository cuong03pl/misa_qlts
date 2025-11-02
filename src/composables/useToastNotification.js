import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import MsToast from '@/components/ms-toast/MsToast.vue'

/**
 * Composable quản lý toast notifications
 * createdby: hkc
 */
export const useToastNotification = () => {
  const { t } = useI18n()
  const toast = useToast()

  /**
   * Hiển thị toast thành công
   * @param {string} message - Nội dung thông báo
   */
  const showSuccess = (message) => {
    toast.success({
      component: MsToast,
      props: {
        type: 'success',
        message,
        icon: 'icon success-noti-icon',
      },
    })
  }

  /**
   * Hiển thị toast lỗi
   * @param {Error|Object} error - Error object hoặc custom error
   * @param {string} defaultMessage - Message mặc định nếu không có message từ error
   */
  const showError = (error, defaultMessage = '') => {
    const message = error?.response?.data?.message || error?.message || defaultMessage || t('common.error')
    
    toast.error({
      component: MsToast,
      props: {
        type: 'error',
        message,
        icon: 'icon error-noti-icon',
      },
    })
  }

  return {
    showSuccess,
    showError
  }
}

