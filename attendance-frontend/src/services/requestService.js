import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `attendancerequest`: employeeId, type (CUTI/IZIN/SAKIT),
// startDate, endDate, reason, attachment, status, approvedById

export async function getMyRequests(employeeId) {
  const { data } = await api.get(ENDPOINTS.REQUEST.BASE, { params: { employeeId } })
  return data
}

// payload: { type, startDate, endDate, reason, attachment }
// attachment sebaiknya dikirim via FormData kalau backend butuh upload file bukti sakit
export async function submitRequest(payload) {
  const { data } = await api.post(ENDPOINTS.REQUEST.BASE, payload)
  return data
}

// Untuk admin
export async function getAllRequests(params = {}) {
  const { data } = await api.get(ENDPOINTS.REQUEST.BASE, { params })
  return data
}

export async function approveRequest(id) {
  const { data } = await api.patch(ENDPOINTS.REQUEST.APPROVE(id))
  return data
}

export async function rejectRequest(id, reason) {
  const { data } = await api.patch(ENDPOINTS.REQUEST.REJECT(id), { reason })
  return data
}
