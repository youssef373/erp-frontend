import axios from 'axios'

// Sanctum SPA auth: the session lives in an HttpOnly cookie, so every
// request must send cookies and echo the XSRF-TOKEN cookie back as a header.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: { Accept: 'application/json' },
})

export async function login(email, password) {
  await api.get('/sanctum/csrf-cookie')
  const { data } = await api.post('/api/login', { email, password })
  return data
}

export function logout() {
  return api.post('/api/logout')
}

export default api
