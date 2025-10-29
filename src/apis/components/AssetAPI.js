import api from '@/apis/config/APIConfig.js'
import BaseAPI from '@/apis/base/BaseAPI.js'

class CandidateAPI extends BaseAPI {
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
}

export default new CandidateAPI()
