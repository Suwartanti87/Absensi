import { Outlet } from 'react-router-dom'
import { LayoutDashboard, Users, Building2, CalendarClock, ShieldCheck, UserCheck2, CalendarCheck2, ClipboardCheck } from 'lucide-react'
import Sidebar from '../components/common/Sidebar.jsx'

const items = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/karyawan', label: 'Karyawan', icon: Users },
  { to: '/admin/departemen', label: 'Departemen', icon: Building2 },
  { to: '/admin/jadwal', label: 'Jadwal Kerja', icon: CalendarClock },
  { to: '/admin/absensi', label: 'Absensi Karyawan', icon: CalendarCheck2 },
  { to: '/admin/pengajuan', label: 'Pengajuan', icon: ClipboardCheck },
  { to: '/admin/tamu', label: 'Tamu / Kunjungan', icon: UserCheck2 },
  { to: '/admin/user', label: 'Akun Pengguna', icon: ShieldCheck },
]

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar title="ADMIN" subtitle="ABSENSI PANEL" items={items} />
      <main className="min-h-screen flex-1 bg-slate-50 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
