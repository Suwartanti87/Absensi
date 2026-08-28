import { useEffect, useState } from 'react'
import { LogIn, LogOut } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import AttendanceStatus from '../../components/common/AttendanceStatus.jsx'
import * as visitorLogService from '../../services/visitorLogService.js'

const DUMMY = [
  { id: 1, visitorName: 'Budi Santoso', company: 'PT Maju Jaya', employeeName: 'Andi Pratama', purpose: 'Meeting', visitDate: '23 Mei 2025 10:00', status: 'Menunggu' },
  { id: 2, visitorName: 'Rina Amelia', company: 'CV Sukses Mandiri', employeeName: 'Sinta Wulandari', purpose: 'Interview', visitDate: '23 Mei 2025 13:00', status: 'Disetujui' },
]

export default function VisitorManagement() {
  const [rows, setRows] = useState(DUMMY)

  useEffect(() => {
    visitorLogService.getVisitorLogs().then((data) => data?.length && setRows(data)).catch(() => {})
  }, [])

  async function handleCheckIn(row) {
    try { await visitorLogService.checkInVisitor(row.id) } catch {}
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: 'Disetujui' } : r)))
  }

  return (
    <div>
      <PageHeader title="Tamu / Kunjungan" subtitle="Pantau pengajuan kunjungan (tabel: visitor & visitorlog)" />
      <DataTable
        columns={[
          { key: 'visitorName', label: 'Nama Tamu' },
          { key: 'company', label: 'Perusahaan' },
          { key: 'employeeName', label: 'Dengan Siapa' },
          { key: 'purpose', label: 'Tujuan' },
          { key: 'visitDate', label: 'Jadwal' },
          { key: 'status', label: 'Status', render: (r) => <AttendanceStatus status={r.status} /> },
        ]}
        rows={rows}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <button onClick={() => handleCheckIn(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Check-in tamu"><LogIn size={16} /></button>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="Check-out tamu"><LogOut size={16} /></button>
          </div>
        )}
      />
    </div>
  )
}
