import api from '@/apis/config/APIConfig.js'
import BaseAPI from '@/apis/base/BaseAPI.js'

class AssetAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'assets'
  }
  /**
   * Hàm cập nhật thông tin tài sản
   * @param {string} id - ID của tài sản
   * @param {Object} payload - Dữ liệu cập nhật
   * @returns {Promise} - Promise trả về kết quả cập nhật
   * createdby: HK Cường
   */
  update(id, payload) {
    return api.put(`${this.controller}/${id}`, payload)
  }

  
}

export default new AssetAPI()
