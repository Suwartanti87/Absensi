import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `attendance`: employeeId, date, checkIn, checkOut,
// status, lateMinutes, workDuration

export async function getTodayAttendance() {
  const { data } = await api.get(ENDPOINTS.ATTENDANCE.TODAY)
  return data
}

// code = hasil scan QR (atau kode manual yang diketik user)
export async function checkIn(code) {
  const { data } = await api.post(ENDPOINTS.ATTENDANCE.CHECK_IN, { code })
  return data
}

export async function checkOut(code) {
  const { data } = await api.post(ENDPOINTS.ATTENDANCE.CHECK_OUT, { code })
  return data
}

export async function getAttendanceHistory({ month, year, page = 1 } = {}) {
  const { data } = await api.get(ENDPOINTS.ATTENDANCE.HISTORY, {
    params: { month, year, page },
  })
  return data
}

// Untuk admin: lihat semua absensi karyawan
export async function getAllAttendance(params = {}) {
  const { data } = await api.get(ENDPOINTS.ATTENDANCE.ALL, { params })
  return data
}
