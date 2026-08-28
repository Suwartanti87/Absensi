import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `workschedule`: name, startTime, endTime, lateTolerance
export async function getSchedules() {
  const { data } = await api.get(ENDPOINTS.SCHEDULE.BASE)
  return data
}

export async function getMySchedule(employeeId, month, year) {
  const { data } = await api.get(ENDPOINTS.SCHEDULE.BY_EMPLOYEE(employeeId), {
    params: { month, year },
  })
  return data
}

export async function createSchedule(payload) {
  const { data } = await api.post(ENDPOINTS.SCHEDULE.BASE, payload)
  return data
}

export async function updateSchedule(id, payload) {
  const { data } = await api.put(ENDPOINTS.SCHEDULE.BY_ID(id), payload)
  return data
}

export async function deleteSchedule(id) {
  const { data } = await api.delete(ENDPOINTS.SCHEDULE.BY_ID(id))
  return data
}
