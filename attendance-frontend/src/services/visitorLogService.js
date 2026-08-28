import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `visitorlog`: visitorId, employeeId (yang dituju), purpose,
// visitDate, checkIn, checkOut, status

// payload: { visitorId, employeeId, purpose, visitDate }
export async function createVisitorLog(payload) {
  const { data } = await api.post(ENDPOINTS.VISITOR_LOG.BASE, payload)
  return data
}

export async function getVisitorLogs(params = {}) {
  const { data } = await api.get(ENDPOINTS.VISITOR_LOG.BASE, { params })
  return data
}

export async function checkInVisitor(id) {
  const { data } = await api.patch(ENDPOINTS.VISITOR_LOG.CHECK_IN(id))
  return data
}

export async function checkOutVisitor(id) {
  const { data } = await api.patch(ENDPOINTS.VISITOR_LOG.CHECK_OUT(id))
  return data
}
