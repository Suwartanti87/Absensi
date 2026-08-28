import { Outlet } from 'react-router-dom'
import { CalendarCheck2, CalendarClock, History, ClipboardList, IdCard } from 'lucide-react'
import Sidebar from '../components/common/Sidebar.jsx'

const items = [
  { to: '/employee', label: 'Absensi', icon: CalendarCheck2, end: true },
  { to: '/employee/jadwal', label: 'Jadwal Kerja', icon: CalendarClock },
  { to: '/employee/riwayat', label: 'Riwayat', icon: History },
  { to: '/employee/pengajuan', label: 'Pengajuan', icon: ClipboardList },
  { to: '/employee/profil', label: 'Profil Saya', icon: IdCard },
]

export default function EmployeeLayout() {
  return (
    <div className="flex">
      <Sidebar items={items} />
      <main className="min-h-screen flex-1 bg-slate-50 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
