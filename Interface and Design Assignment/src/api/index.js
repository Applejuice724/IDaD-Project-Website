import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('cv_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getCards      = (params)    => api.get('/cards', { params })
export const getCard       = (id)        => api.get(`/cards/${id}`)
export const createCard    = (data)      => api.post('/cards', data)
export const updateCard    = (id, data)  => api.put(`/cards/${id}`, data)
export const deleteCard    = (id)        => api.delete(`/cards/${id}`)
export const toggleLike    = (id)        => api.post(`/cards/${id}/like`)
export const postComment   = (id, body)  => api.post(`/cards/${id}/comments`, { body })
export const deleteComment = (cId, cmId) => api.delete(`/cards/${cId}/comments/${cmId}`)
export const getCategories = ()          => api.get('/categories')
export const getProfile       = (id)     => api.get(`/users/${id}/profile`)
export const updateProfile    = (data)   => api.put('/users/me', data)
export const toggleCollection = (cardId) => api.post(`/users/collection/${cardId}`)

export default api
