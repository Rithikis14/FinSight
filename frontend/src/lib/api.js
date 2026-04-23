import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach JWT to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('fs_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-logout on 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('fs_token')
      localStorage.removeItem('fs_user')
      window.location.href = '/auth'
    }
    return Promise.reject(err)
  }
)

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
}

export const investmentApi = {
  getAll:    ()       => api.get('/investments'),
  getSummary:()       => api.get('/investments/summary'),
  add:       (data)   => api.post('/investments', data),
  remove:    (id)     => api.delete(`/investments/${id}`),
}

export const aiApi = {
  chat: (message) => api.post('/ai/chat', { message }),
}

export default api
