import api from '@/apis/config/APIConfig.js'

export default class BaseAPI {
  constructor() {
    this.controller = null
  }
  /**
   * Phương thức lấy tất cả dữ liệu
   * createdby: HK Cường
   */
  getAll() {
    return api.get(`${this.controller}`)
  }
  /**
   * Hàm lấy thông tin tài sản theo ID
   * @param {string} id - ID của tài sản
   * @param {Object} payload - Payload của request
   * createdby: HK Cường
   */
  getById(id, payload = null) {
    return api.get(`${this.controller}/${id}`, { params: payload })
  }
  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   * createdby: HK Cường
   */
  paging(payload) {
    return api.get(`${this.controller}/paging`, { params: payload })
  }
  /**
   * Hàm cập nhật dữ liệu
   * @param {*} id
   * @param {*} body
   * createdby: HK Cường
   */
  update(id, body) {
    return api.put(`${this.controller}/${id}`, body)
  }

  /**
   * Hàm tạo dữ liệu
   * @param {*} body
   * createdby: HK Cường
   */
  create(body) {
    return api.post(`${this.controller}`, body)
  }

  /**
   * Hàm xóa bản ghi
   * @param {*} id
   * createdby: HK Cường
   */
  delete(id) {
    return api.delete(`${this.controller}/delete/${id}`)
  }

  /**
   * Hàm xóa nhiều bản ghi
   * @param {*} id
   * createdby: HK Cường
   */
  deleteMultiple(body) {
    return api.post(`${this.controller}/delete-multiple`, body)
  }

  /**
   * Tạo mã mới
   * @returns {Promise} - Promise trả về mã mới
   * createdby: HK Cường
   */
  generateNewCode() {
    return api.get(`${this.controller}/new-code`)
  }
}
