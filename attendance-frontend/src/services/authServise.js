import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

/**
 * Login: kirim { username, password } (sesuaikan dengan field tabel `user`).
 * Backend diharapkan balas: { token, user: { id, username, role, employeeId, ... } }
 * `role` dipakai AuthContext untuk menentukan redirect ke /admin atau /employee.
 */
export async function login(username, password) {
  const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, { username, password })
  return data
}

export async function logout() {
  try {
    await api.post(ENDPOINTS.AUTH.LOGOUT)
  } finally {
    localStorage.removeItem('absensi_token')
    localStorage.removeItem('absensi_user')
  }
}

export async function getMe() {
  const { data } = await api.get(ENDPOINTS.AUTH.ME)
  return data
}
