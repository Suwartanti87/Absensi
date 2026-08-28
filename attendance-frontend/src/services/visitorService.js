import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `visitor`: name, phone, email, company
// Dipakai di Landing Page publik (Form Tamu) sebelum mengisi VisitorLog
export async function createVisitor(payload) {
  const { data } = await api.post(ENDPOINTS.VISITOR.BASE, payload)
  return data
}

export async function getVisitors(params = {}) {
  const { data } = await api.get(ENDPOINTS.VISITOR.BASE, { params })
  return data
}
