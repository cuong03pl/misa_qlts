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
   * Hàm lấy thông tin tài sản theo ID
   * @param {string} id - ID của tài sản
   * @returns {Promise} - Promise trả về thông tin tài sản
   */
  getById(id) {
    return api.get(`${this.controller}/${id}`)
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

  /**
   * Tạo mã tài sản mới
   * @returns {Promise} - Promise trả về mã tài sản mới
   */
  generateNewAssetCode() {
    return api.get(`${this.controller}/new-asset-code`)
  }
}

export default new AssetAPI()
