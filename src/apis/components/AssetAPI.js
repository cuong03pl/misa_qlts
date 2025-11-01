import api from '@/apis/config/APIConfig.js'
import BaseAPI from '@/apis/base/BaseAPI.js'

class AssetAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'assets'
  }

  /**
   * Hàm kiểm tra trùng lặp theo nghiệp vụ riêng
   * @param {*} payload
   * @returns
   */
  checkDuplicate(payload) {
    return api.post(`${this.controller}/check-duplicate`, payload)
  }
  
  
  
  /**
   * Hàm cập nhật thông tin tài sản
   * @param {string} id - ID của tài sản
   * @param {Object} payload - Dữ liệu cập nhật
   * @returns {Promise} - Promise trả về kết quả cập nhật
   */
  update(id, payload) {
    return api.put(`${this.controller}/${id}`, payload)
  }

  
}

export default new AssetAPI()
