import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import QRScanner from '../../components/common/QRScanner.jsx'
import * as attendanceService from '../../services/attendanceService.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate} from 'react-router-dom'

export default function Attendance() {
  const [now, setNow] = useState(new Date())
  const [today, setToday] = useState({ checkIn: null, checkOut: null })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const employee = user?.employee


  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    attendanceService.getTodayAttendance().then(setToday).catch(() => {})
  }, [])

  async function handleScan(code) {
    setLoading(true)
    setMessage('')
    try {
      const isCheckIn = !today.checkIn
      const data = isCheckIn
        ? await attendanceService.checkIn(code)
        : await attendanceService.checkOut(code)
      setToday((t) => ({ ...t, ...data }))
      setMessage(isCheckIn ? 'Absen masuk berhasil dicatat.' : 'Absen pulang berhasil dicatat.')
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
        'Backend belum tersambung — cek src/services/attendanceService.js untuk menghubungkan endpoint check-in/out.'
      )
    } finally {
      setLoading(false)
    }
  }

  const timeLabel = now.toLocaleTimeString('id-ID', { hour12: false })
  const dateLabel = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div>
      
      <PageHeader title="Absensi" subtitle="Scan QR Code untuk melakukan absensi masuk atau pulang." />

      <div className="mb-5 rounded-xl bg-yellow-50 p-4">
        <p className="font-bold">
          Nama: {employee?.name || 'Data tidak ada'}
        </p>

        <p>
          Employee Code: {employee?.employeeCode || 'Data tidak ada'}
        </p>

        <p>
          Position: {employee?.position || 'Data tidak ada'}
        </p>
      </div>

      {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="card p-6">
          <p className="text-xs font-medium text-slate-400">
            Waktu & Tanggal
          </p>

          <p className="mt-1 text-3xl font-bold tabular-nums text-slate-800">
            {timeLabel}
          </p>

          <p className="text-sm text-slate-500">
            {dateLabel}
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-600">
            <CheckCircle2 size={16} />
            Lokasi Valid — Anda berada di area kantor
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="text-sm text-slate-500">
                Absensi Masuk
              </span>

              <span className="text-sm font-semibold text-slate-700">
                {today.checkIn || 'Belum Absen'}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="text-sm text-slate-500">
                Absensi Pulang
              </span>

              <span className="text-sm font-semibold text-slate-700">
                {today.checkOut || 'Belum Absen'}
              </span>
            </div>
          </div>

          {message && (
            <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
              {message}
            </p>
          )}
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="card p-6">
          <p className="text-xs font-medium text-slate-400">Waktu & Tanggal</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-slate-800">{timeLabel}</p>
          <p className="text-sm text-slate-500">{dateLabel}</p>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-600">
            <CheckCircle2 size={16} /> Lokasi Valid — Anda berada di area kantor
          
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="text-sm text-slate-500">Absensi Masuk</span>
              <span className="text-sm font-semibold text-slate-700">{today.checkIn || 'Belum Absen'}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="text-sm text-slate-500">Absensi Pulang</span>
              <span className="text-sm font-semibold text-slate-700">{today.checkOut || 'Belum Absen'}</span>
            </div>
             
          </div>

          {message && (
            <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">{message}</p>
          )}
        </div>

        <QRScanner onSubmit={handleScan} loading={loading} />
      </div>
    </div>
  )
}
