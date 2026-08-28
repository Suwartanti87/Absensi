import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

/**
 * Kalender jadwal kerja 1 bulan.
 * `schedule` = { 'YYYY-MM-DD': { label: '08:00 - 17:00', type: 'kerja' | 'libur' | 'khusus' } }
 */
export default function AttendanceCalendar({ monthLabel, weeks, onPrev, onNext, schedule = {} }) {
  const typeStyle = {
    kerja: 'bg-brand-50 text-brand-700 border-brand-100',
    libur: 'bg-rose-50 text-rose-600 border-rose-100',
    khusus: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onPrev} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50">
            <ChevronLeft size={16} />
          </button>
          <p className="w-32 text-center text-sm font-semibold text-slate-700">{monthLabel}</p>
          <button onClick={onNext} className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50">
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-400" /> Hari Kerja</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-400" /> Libur</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold text-slate-400">
        {DAYS.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {weeks.flat().map((day, i) => {
          if (!day) return <div key={i} />
          const info = schedule[day.key]
          return (
            <div
              key={i}
              className={`rounded-xl border px-1.5 py-2 text-center text-[11px] ${
                info ? typeStyle[info.type] : 'border-transparent text-slate-300'
              }`}
            >
              <p className="font-semibold">{day.date}</p>
              {info && <p className="mt-0.5 leading-tight">{info.label}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
