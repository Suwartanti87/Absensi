const STYLES = {
  Hadir: 'bg-emerald-50 text-emerald-600',
  Terlambat: 'bg-amber-50 text-amber-600',
  Izin: 'bg-amber-50 text-amber-600',
  Sakit: 'bg-rose-50 text-rose-600',
  Cuti: 'bg-sky-50 text-sky-600',
  Libur: 'bg-slate-100 text-slate-500',
  Alpha: 'bg-rose-50 text-rose-600',
  Menunggu: 'bg-amber-50 text-amber-600',
  Disetujui: 'bg-emerald-50 text-emerald-600',
  Ditolak: 'bg-rose-50 text-rose-600',
}

export default function AttendanceStatus({ status }) {
  return (
    <span className={`badge ${STYLES[status] || 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  )
}
