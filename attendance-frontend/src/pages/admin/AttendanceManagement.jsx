import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import AttendanceStatus from '../../components/common/AttendanceStatus.jsx'
import * as attendanceService from '../../services/attendanceService.js'

const DUMMY = [
  { id: 1, employeeName: 'Andi Pratama', date: '23 Mei 2025', checkIn: '07:45', checkOut: '-', status: 'Hadir' },
  { id: 2, employeeName: 'Sinta Wulandari', date: '23 Mei 2025', checkIn: '08:10', checkOut: '17:00', status: 'Terlambat' },
]

export default function AttendanceManagement() {
  const [rows, setRows] = useState(DUMMY)

  useEffect(() => {
    attendanceService.getAllAttendance().then((data) => data?.length && setRows(data)).catch(() => {})
  }, [])

  return (
    <div>
      <PageHeader title="Absensi Karyawan" subtitle="Rekap absensi seluruh karyawan (tabel: attendance)" />
      <DataTable
        columns={[
          { key: 'employeeName', label: 'Nama Karyawan' },
          { key: 'date', label: 'Tanggal' },
          { key: 'checkIn', label: 'Masuk' },
          { key: 'checkOut', label: 'Pulang' },
          { key: 'status', label: 'Status', render: (r) => <AttendanceStatus status={r.status} /> },
        ]}
        rows={rows}
      />
    </div>
  )
}
