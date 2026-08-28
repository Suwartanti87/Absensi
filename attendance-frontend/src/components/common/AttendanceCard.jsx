import AttendanceStatus from './AttendanceStatus.jsx'

// Kartu ringkas dipakai di Dashboard karyawan: jam masuk/pulang hari ini.
export default function AttendanceCard({ today, checkIn, checkOut, status }) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Absensi Hari Ini</p>
        {status && <AttendanceStatus status={status} />}
      </div>
      <p className="text-2xl font-bold text-slate-800">{today}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[11px] text-slate-400">Absen Masuk</p>
          <p className="text-sm font-semibold text-slate-700">{checkIn || 'Belum Absen'}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[11px] text-slate-400">Absen Pulang</p>
          <p className="text-sm font-semibold text-slate-700">{checkOut || 'Belum Absen'}</p>
        </div>
      </div>
    </div>
  )
}
