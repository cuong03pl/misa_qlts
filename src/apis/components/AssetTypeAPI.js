import BaseAPI from '@/apis/base/BaseAPI.js'

class AssetTypeAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'asset-types'
  }
}

export default new AssetTypeAPI()
