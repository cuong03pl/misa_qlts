import api from '@/apis/config/APIConfig.js'

export default class BaseAPI {
  constructor() {
    this.controller = null
  }
  /**
   * Phương thức lấy tất cả dữ liệu
   */
  getAll() {
    return api.get(`${this.controller}`)
  }
  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   */
  paging(payload) {
    return api.post(`${this.controller}/paging`, payload)
  }
  /**
   * Hàm cập nhật dữ liệu
   * @param {*} id
   * @param {*} body
   */
  update(id, body) {
    return api.update(`${this.controller}/update/${id}`, body)
  }

  /**
   * Hàm tạo dữ liệu
  * @param {*} body
   */
  create(body) {
    return api.post(`${this.controller}`, body)
  }

  /**
   * Hàm xóa bản ghi
   * @param {*} id
   */
  delete(id) {
    return api.delete(`${this.controller}/delete/${id}`)
  }

   /**
   * Hàm xóa nhiều bản ghi
   * @param {*} id
   */
   deleteMultiple(body) {
    return api.post(`${this.controller}/delete-multiple`, body)
  }
}
