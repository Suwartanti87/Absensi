import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `employee`: employeeCode, name, email, phone, address,
// position, joinDate, status, departmentId, workScheduleId
export async function getEmployees(params = {}) {
  const { data } = await api.get(ENDPOINTS.EMPLOYEE.BASE, { params })
  return data
}

export async function getEmployeeById(id) {
  const { data } = await api.get(ENDPOINTS.EMPLOYEE.BY_ID(id))
  return data
}

export async function createEmployee(payload) {
  const { data } = await api.post(ENDPOINTS.EMPLOYEE.BASE, payload)
  return data
}

export async function updateEmployee(id, payload) {
  const { data } = await api.put(ENDPOINTS.EMPLOYEE.BY_ID(id), payload)
  return data
}

export async function deleteEmployee(id) {
  const { data } = await api.delete(ENDPOINTS.EMPLOYEE.BY_ID(id))
  return data
}
