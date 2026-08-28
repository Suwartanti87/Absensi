import axios from 'axios'

/**
 * ==========================================================================
 *  SATU-SATUNYA TEMPAT KAMU PERLU UBAH UNTUK SAMBUNG KE BACKEND
 * ==========================================================================
 * Base URL diambil dari file .env (VITE_API_BASE_URL).
 * 1. Copy .env.example -> .env
 * 2. Isi VITE_API_BASE_URL dengan alamat backend kamu, contoh:
 *    VITE_API_BASE_URL=http://localhost:8000/api
 * 3. Semua file di src/services/*.js memanggil endpoint lewat `api` di
 *    bawah ini, jadi kamu TIDAK perlu ubah satu-satu di tiap service.
 * ==========================================================================
 */
const api = axios.create({
  baseURL: import.meta.env.DATABASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Setiap request otomatis membawa token login (JWT) kalau sudah login.
// Sesuaikan nama header ('Authorization') dengan yang backend kamu harapkan.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('absensi_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Kalau backend balas 401 (token expired/invalid), otomatis lempar ke login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('absensi_token')
      localStorage.removeItem('absensi_user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
