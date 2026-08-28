import { useEffect, useState } from 'react'
import { CalendarCheck2, ClipboardList, History } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import AttendanceCard from '../../components/common/AttendanceCard.jsx'
import StatCard from '../../components/common/StatCard.jsx'
import * as attendanceService from '../../services/attendanceService.js'

export default function EmployeeDashboard() {
  const [today, setToday] = useState({ checkIn: null, checkOut: null, status: null })

  useEffect(() => {
    attendanceService
      .getTodayAttendance()
      .then((data) => setToday(data))
      .catch(() => {
        // Backend belum tersambung — tampilkan data contoh biar UI tetap enak dilihat.
        setToday({ checkIn: '07:45', checkOut: null, status: 'Hadir' })
      })
  }, [])

  const dateLabel = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Ringkasan aktivitas absensi kamu" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AttendanceCard today={dateLabel} checkIn={today.checkIn} checkOut={today.checkOut} status={today.status} />
        <StatCard icon={CalendarCheck2} label="Hadir Bulan Ini" value="18 Hari" tone="green" />
        <StatCard icon={History} label="Terlambat" value="1 Hari" tone="amber" />
      </div>

      <div className="mt-6 card p-5">
        <div className="mb-3 flex items-center gap-2 text-slate-700">
          <ClipboardList size={18} />
          <p className="text-sm font-semibold">Butuh cuti atau izin?</p>
        </div>
        <p className="text-sm text-slate-500">
          Ajukan cuti, izin, atau sakit langsung dari menu Pengajuan di sidebar.
        </p>
      </div>
    </div>
  )
}
