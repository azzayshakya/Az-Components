import api from './apiService'
import { storage } from '../utils/storage'

export const authService = {
  login: async (payload) => {
    const data = await api.post('/auth/login', payload)
    storage.setToken(data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data
  },

  logout: () => {
    storage.clear()
    window.location.href = '/login'
  },

  getProfile: () => api.get('/auth/profile'),
}
