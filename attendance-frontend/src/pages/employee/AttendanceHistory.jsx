import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import AttendanceStatus from '../../components/common/AttendanceStatus.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import * as attendanceService from '../../services/attendanceService.js'

const DUMMY = [
  { date: '23 Mei 2025', day: 'Jumat', checkIn: '07:45', checkOut: '-', status: 'Hadir', note: '-' },
  { date: '22 Mei 2025', day: 'Kamis', checkIn: '07:48', checkOut: '17:05', status: 'Hadir', note: '-' },
  { date: '21 Mei 2025', day: 'Rabu', checkIn: '07:50', checkOut: '17:02', status: 'Hadir', note: '-' },
  { date: '19 Mei 2025', day: 'Senin', checkIn: '-', checkOut: '-', status: 'Izin', note: 'Urusan Keluarga' },
  { date: '18 Mei 2025', day: 'Minggu', checkIn: '-', checkOut: '-', status: 'Libur', note: '-' },
  { date: '14 Mei 2025', day: 'Rabu', checkIn: '-', checkOut: '-', status: 'Sakit', note: 'Demam' },
]

export default function AttendanceHistory() {
  const [rows, setRows] = useState(DUMMY)

  useEffect(() => {
    attendanceService
      .getAttendanceHistory({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })
      .then((data) => setRows(data?.items?.length ? data.items : DUMMY))
      .catch(() => setRows(DUMMY))
  }, [])

  return (
    <div>
      <PageHeader title="Riwayat Absensi" subtitle="Riwayat absensi Anda selama 1 bulan." />

      <div className="card overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-6"><EmptyState title="Belum ada riwayat absensi" /></div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Masuk</th>
                <th className="px-5 py-3">Pulang</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-700">{r.date}</p>
                    <p className="text-xs text-slate-400">{r.day}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{r.checkIn}</td>
                  <td className="px-5 py-3 text-slate-600">{r.checkOut}</td>
                  <td className="px-5 py-3"><AttendanceStatus status={r.status} /></td>
                  <td className="px-5 py-3 text-slate-500">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
