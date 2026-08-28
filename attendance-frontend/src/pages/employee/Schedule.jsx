import { useMemo, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import AttendanceCalendar from '../../components/common/AttendanceCalendar.jsx'
import * as scheduleService from '../../services/scheduleService.js'
import { useEffect } from 'react'

function buildWeeks(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // Senin = 0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ date: d, key })
  }
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export default function Schedule() {
  const [cursor, setCursor] = useState(new Date())
  const [scheduleMap, setScheduleMap] = useState({})

  const weeks = useMemo(() => buildWeeks(cursor.getFullYear(), cursor.getMonth()), [cursor])
  const monthLabel = cursor.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  useEffect(() => {
    scheduleService
      .getMySchedule('me', cursor.getMonth() + 1, cursor.getFullYear())
      .then((data) => setScheduleMap(data || {}))
      .catch(() => {
        // Data contoh: Senin-Jumat kerja, Sabtu-Minggu libur.
        const map = {}
        weeks.flat().forEach((day) => {
          if (!day) return
          const dow = new Date(day.key).getDay()
          map[day.key] = dow === 0 || dow === 6
            ? { label: 'Libur', type: 'libur' }
            : { label: '08:00 - 17:00', type: 'kerja' }
        })
        setScheduleMap(map)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor])

  return (
    <div>
      <PageHeader title="Jadwal Kerja" subtitle="Jadwal kerja Anda selama 1 bulan." />
      <AttendanceCalendar
        monthLabel={monthLabel}
        weeks={weeks}
        schedule={scheduleMap}
        onPrev={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
        onNext={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
      />
    </div>
  )
}
