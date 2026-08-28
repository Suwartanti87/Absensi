import { Link } from 'react-router-dom'

// Navbar publik untuk Landing Page & Form Tamu (belum login).
export default function Navbar({ right }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">A</div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-800">ABSENSI</p>
            <p className="text-[10px] font-medium text-slate-400">KARYAWAN</p>
          </div>
        </Link>
        {right}
      </div>
    </header>
  )
}
