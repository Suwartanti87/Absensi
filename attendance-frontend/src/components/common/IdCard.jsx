import { QrCode } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'


// Kartu ID sederhana untuk halaman "IdCardPage" — QR ini nanti berisi
// employeeCode yang dipakai backend untuk validasi Check In/Out.
export default function IdCard({ }) {
   const { user } = useAuth()

  const employee = user?.employee
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-panel">
      <div className="flex items-center justify-between px-5 pt-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">Kartu Karyawan</p>
          <p className="text-sm font-bold">Absensi Karyawan</p>
        </div>
        
      </div>

      <div className="mt-4 flex items-center gap-4 px-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/15 text-xl font-bold">
          {(employee?.name || '?').slice(0, 1)}
        </div>
        <div>
          <p className="text-base font-bold">{employee?.name || 'Nama Karyawan'}</p>
          <p className="text-xs text-blue-200">{employee?.position || 'Jabatan'}</p>
          <p className="text-xs text-blue-200">{employee?.employeeCode || 'Kode Karyawan'}</p>
          <p className="text-xs text-blue-200">{employee?.employeeId || 'ID QR Code'}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center bg-white/95 py-6">
        <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-slate-900 text-white">
          <QrCode size={72} />
        </div>
      </div>
      <p className="bg-white/95 pb-4 text-center text-[11px] text-slate-500">
        Tunjukkan QR ini ke perangkat absensi
      </p>
    </div>
  )
}
