import axios from 'axios'

const baseURL = 'https://localhost:7002/api/'

let api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && [401, 403].includes(error.response.status)) {
      // handle error
    }
    return Promise.reject(error)
  },
)

export default api
