import { Link } from 'react-router-dom'
import { CalendarCheck2, CalendarClock, ClipboardList, LineChart, ShieldCheck } from 'lucide-react'
import Navbar from '../components/common/Navbar.jsx'

const FEATURES = [
  { icon: CalendarCheck2, title: 'Absensi QR Code', desc: 'Check-in & check-out lebih cepat dan akurat' },
  { icon: CalendarClock, title: 'Jadwal Kerja', desc: 'Kelola jadwal dan shift dengan mudah' },
  { icon: ClipboardList, title: 'Pengajuan Terintegrasi', desc: 'Cuti, izin, sakit dalam satu sistem' },
  { icon: LineChart, title: 'Laporan Real-time', desc: 'Pantau kehadiran dan kinerja karyawan' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar
        right={
          <Link to="/login" className="btn-primary">
            Login Karyawan
          </Link>
        }
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <span className="badge bg-brand-50 text-brand-600">Sistem Absensi Terintegrasi</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">
            Kelola Absensi Lebih Mudah,<br />
            <span className="text-brand-600">Kerja Lebih Produktif</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-slate-500">
            Sistem absensi modern untuk karyawan dan manajemen. Aman, akurat, dan efisien dalam satu platform.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/login" className="btn-primary px-5 py-3">
              Login Karyawan
              <span className="text-xs font-normal text-blue-100">Akses akun untuk karyawan</span>
            </Link>
            <Link to="/visitor" className="btn-accent px-5 py-3">
              Tamu / Kunjungan
              <span className="text-xs font-normal text-emerald-50">Kunjungan atau janji temu</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-100 p-3">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <f.icon size={18} />
                </div>
                <p className="text-xs font-semibold text-slate-700">{f.title}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200" />
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-panel">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Check-in Berhasil</p>
              <p className="text-xs text-slate-400">07:45 WIB</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-slate-900 py-8 text-center text-xs text-slate-400">
        Sistem absensi modern untuk perusahaan. © {new Date().getFullYear()} Absensi Karyawan.
      </footer>
    </div>
  )
}
