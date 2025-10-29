export const formatter = {
  date: (date) => formatDate(date),
  phone: (phone) => formatPhone(phone),
  text: (text) => text,
  number: (number) => formatNumber(number),
  currency: (currency) => formatCurrency(currency),
}

/**
 * Hàm định dạng thời gian
 * @param date - Thời gian cần định dạng
 * @returns {string} - Thời gian đã được định dạng
 * createdby: hkc
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

/**
 * Hàm định dạng số điện thoại
 * @param phone - Số điện thoại cần định dạng
 * @returns {string} - Số điện thoại đã được định dạng
 * createdby: hkc
 */
const formatPhone = (phone) => {
  if (!phone) return ''

  let digits = phone.toString().replace(/\D/g, '')

  if (digits.startsWith('84')) digits = '0' + digits.slice(2)

  digits = digits.slice(-10)

  if (digits.length === 10) {
    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }

  return digits
}

/**
 * Hàm định dạng số
 * @param number - Số cần định dạng
 * @returns {string} - Số đã được định dạng
 * createdby: hkc
 */
const formatNumber = (number) => {
  if (number === null || number === undefined) return ''
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Hàm định dạng tiền tệ
 * @param currency - Số tiền cần định dạng
 * @returns {string} - Số tiền đã được định dạng
 * createdby: hkc
 */
const formatCurrency = (currency) => {
  if (currency === null || currency === undefined) return ''
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(currency)
}
