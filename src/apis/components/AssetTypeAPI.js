import api from '@/apis/config/APIConfig.js'
import BaseAPI from '@/apis/base/BaseAPI.js'

class AssetTypeAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'asset-types'
  }

  checkDuplicate(payload) {
    return api.post(`${this.controller}/check-duplicate`, payload)
  }
}

export default new AssetTypeAPI()
