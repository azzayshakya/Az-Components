import axios from 'axios'
import { storage } from './utils/storage'
import { errorHandler } from './utils/errorHandler'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})


api.interceptors.request.use(
  (config) => {
    const token = storage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const normalizedError = errorHandler(error)

    if (normalizedError.status === 401) {
      storage.clear()
      window.location.href = '/login'
    }

    return Promise.reject(normalizedError)
  }
)

export default api
