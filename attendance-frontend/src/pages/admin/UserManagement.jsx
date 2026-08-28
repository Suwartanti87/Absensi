import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import AttendanceStatus from '../../components/common/AttendanceStatus.jsx'
import api from '../../api/client.js'
import { ENDPOINTS } from '../../api/endpoints.js'

const DUMMY = [
  { id: 1, username: 'andi.pratama', role: 'EMPLOYEE', employeeCode: 'EMP-0001' },
  { id: 2, username: 'admin.hr', role: 'HR_ADMIN', employeeCode: '-' },
]

export default function UserManagement() {
  const [rows, setRows] = useState(DUMMY)

  useEffect(() => {
    api.get(ENDPOINTS.USER.BASE).then(({ data }) => data?.length && setRows(data)).catch(() => {})
  }, [])

  return (
    <div>
      <PageHeader
        title="Akun Pengguna"
        subtitle="Kelola akun login karyawan & admin (tabel: user)"
        action={<button className="btn-primary"><Plus size={16} /> Tambah Akun</button>}
      />
      <DataTable
        columns={[
          { key: 'username', label: 'Username' },
          { key: 'employeeCode', label: 'Kode Karyawan' },
          { key: 'role', label: 'Role', render: (r) => <AttendanceStatus status={r.role === 'EMPLOYEE' ? 'Hadir' : 'Disetujui'} /> },
        ]}
        rows={rows}
      />
    </div>
  )
}
