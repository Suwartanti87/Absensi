import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import AttendanceStatus from '../../components/common/AttendanceStatus.jsx'
import * as requestService from '../../services/requestService.js'

const DUMMY = [
  { id: 1, employeeName: 'Andi Pratama', type: 'Cuti', startDate: '25 Mei 2025', endDate: '27 Mei 2025', reason: 'Acara keluarga', status: 'Menunggu' },
  { id: 2, employeeName: 'Sinta Wulandari', type: 'Sakit', startDate: '20 Mei 2025', endDate: '20 Mei 2025', reason: 'Demam', status: 'Menunggu' },
]

export default function AttendanceRequestManagement() {
  const [rows, setRows] = useState(DUMMY)

  useEffect(() => {
    requestService.getAllRequests().then((data) => data?.length && setRows(data)).catch(() => {})
  }, [])

  async function handleApprove(row) {
    try { await requestService.approveRequest(row.id) } catch {}
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: 'Disetujui' } : r)))
  }

  async function handleReject(row) {
    try { await requestService.rejectRequest(row.id, 'Ditolak oleh admin') } catch {}
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: 'Ditolak' } : r)))
  }

  return (
    <div>
      <PageHeader title="Pengajuan Cuti / Izin / Sakit" subtitle="Setujui atau tolak pengajuan karyawan (tabel: attendancerequest)" />
      <DataTable
        columns={[
          { key: 'employeeName', label: 'Nama Karyawan' },
          { key: 'type', label: 'Jenis' },
          { key: 'startDate', label: 'Mulai' },
          { key: 'endDate', label: 'Selesai' },
          { key: 'reason', label: 'Alasan' },
          { key: 'status', label: 'Status', render: (r) => <AttendanceStatus status={r.status} /> },
        ]}
        rows={rows}
        actions={(row) => row.status === 'Menunggu' ? (
          <div className="flex justify-end gap-2">
            <button onClick={() => handleApprove(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"><Check size={16} /></button>
            <button onClick={() => handleReject(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><X size={16} /></button>
          </div>
        ) : null}
      />
    </div>
  )
}
