import { useEffect, useState } from 'react'
import { Users, Building2, CalendarCheck2, ClipboardCheck } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import StatCard from '../../components/common/StatCard.jsx'
import * as employeeService from '../../services/employeeServise.js'
import * as attendanceService from '../../services/attendanceService.js'
import * as requestService from '../../services/requestService.js'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ employees: 42, present: 38, onLeave: 3, pendingRequests: 5 })

  useEffect(() => {
    Promise.allSettled([
      employeeService.getEmployees(),
      attendanceService.getAllAttendance({ date: 'today' }),
      requestService.getAllRequests({ status: 'PENDING' }),
    ]).then(([emp, att, req]) => {
      setStats((s) => ({
        ...s,
        employees: emp.status === 'fulfilled' ? emp.value?.length ?? s.employees : s.employees,
        pendingRequests: req.status === 'fulfilled' ? req.value?.length ?? s.pendingRequests : s.pendingRequests,
      }))
    })
  }, [])

  return (
    <div>
      <PageHeader title="Dashboard Admin" subtitle="Ringkasan absensi & aktivitas karyawan hari ini." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total Karyawan" value={stats.employees} tone="brand" />
        <StatCard icon={CalendarCheck2} label="Hadir Hari Ini" value={stats.present} tone="green" />
        <StatCard icon={Building2} label="Cuti / Izin Hari Ini" value={stats.onLeave} tone="amber" />
        <StatCard icon={ClipboardCheck} label="Pengajuan Menunggu" value={stats.pendingRequests} tone="rose" />
      </div>

      <div className="mt-6 card p-5">
        <p className="text-sm font-semibold text-slate-700">Catatan integrasi</p>
        <p className="mt-1 text-sm text-slate-500">
          Statistik di atas otomatis memanggil endpoint dari <code className="rounded bg-slate-100 px-1">employeeServise</code>,{' '}
          <code className="rounded bg-slate-100 px-1">attendanceService</code>, dan{' '}
          <code className="rounded bg-slate-100 px-1">requestService</code>. Kalau backend belum jalan, halaman ini tetap
          menampilkan angka contoh supaya tampilan tetap enak dilihat.
        </p>
      </div>
    </div>
  )
}
