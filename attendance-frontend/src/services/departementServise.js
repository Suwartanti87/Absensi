import api from '../api/client.js'
import { ENDPOINTS } from '../api/endpoints.js'

// Sesuai tabel `department`: name, description
export async function getDepartments() {
  const { data } = await api.get(ENDPOINTS.DEPARTMENT.BASE)
  return data
}

export async function createDepartment(payload) {
  const { data } = await api.post(ENDPOINTS.DEPARTMENT.BASE, payload)
  return data
}

export async function updateDepartment(id, payload) {
  const { data } = await api.put(ENDPOINTS.DEPARTMENT.BY_ID(id), payload)
  return data
}

export async function deleteDepartment(id) {
  const { data } = await api.delete(ENDPOINTS.DEPARTMENT.BY_ID(id))
  return data
}
