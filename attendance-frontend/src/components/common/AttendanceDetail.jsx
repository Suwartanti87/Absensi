import AttendanceStatus from './AttendanceStatus.jsx'

export default function AttendanceDetail({ record, onClose }) {
  if (!record) return null
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between"><span className="text-slate-400">Tanggal</span><span className="font-medium text-slate-700">{record.date}</span></div>
      <div className="flex justify-between"><span className="text-slate-400">Status</span><AttendanceStatus status={record.status} /></div>
      <div className="flex justify-between"><span className="text-slate-400">Absen Masuk</span><span className="font-medium text-slate-700">{record.checkIn || '-'}</span></div>
      <div className="flex justify-between"><span className="text-slate-400">Absen Pulang</span><span className="font-medium text-slate-700">{record.checkOut || '-'}</span></div>
      {record.note && (
        <div className="flex justify-between"><span className="text-slate-400">Keterangan</span><span className="font-medium text-slate-700">{record.note}</span></div>
      )}
    </div>
  )
}
