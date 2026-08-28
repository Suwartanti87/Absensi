import { useEffect, useState } from 'react'
import { CalendarDays, FileWarning, Stethoscope } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import AttendanceStatus from '../../components/common/AttendanceStatus.jsx'
import * as requestService from '../../services/requestService.js'

const TYPES = [
  { value: 'CUTI', label: 'Cuti', desc: 'Ajukan cuti tahunan atau cuti lainnya.', icon: CalendarDays, tone: 'text-emerald-600 bg-emerald-50' },
  { value: 'IZIN', label: 'Izin', desc: 'Ajukan izin karena keperluan tertentu.', icon: FileWarning, tone: 'text-amber-600 bg-amber-50' },
  { value: 'SAKIT', label: 'Sakit', desc: 'Ajukan sakit dengan melampirkan bukti.', icon: Stethoscope, tone: 'text-rose-600 bg-rose-50' },
]

const DUMMY_HISTORY = [
  { type: 'Izin', startDate: '19 Mei 2025', endDate: '19 Mei 2025', reason: 'Urusan Keluarga', status: 'Disetujui' },
  { type: 'Sakit', startDate: '14 Mei 2025', endDate: '14 Mei 2025', reason: 'Demam', status: 'Disetujui' },
]

export default function AttendanceRequest() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ type: '', startDate: '', endDate: '', reason: '', attachment: null })
  const [history, setHistory] = useState(DUMMY_HISTORY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    requestService.getMyRequests('me').then((data) => {
      if (data?.length) setHistory(data)
    }).catch(() => {})
  }, [])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await requestService.submitRequest(form)
      setStep(3)
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Backend belum tersambung — cek src/services/requestService.js untuk endpoint pengajuan.'
      )
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setForm({ type: '', startDate: '', endDate: '', reason: '', attachment: null })
    setStep(1)
  }

  return (
    <div>
      <PageHeader title="Pengajuan" subtitle="Ajukan cuti, izin atau sakit." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="card p-6 lg:col-span-3">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className={step >= 1 ? 'text-brand-600' : ''}>1. Jenis Pengajuan</span>
            <span>—</span>
            <span className={step >= 2 ? 'text-brand-600' : ''}>2. Detail Pengajuan</span>
            <span>—</span>
            <span className={step >= 3 ? 'text-brand-600' : ''}>3. Konfirmasi</span>
          </div>

          {step === 1 && (
            <div>
              <p className="mb-4 text-sm text-slate-500">Pilih jenis pengajuan yang ingin Anda ajukan.</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { update('type', t.value); setStep(2) }}
                    className={`rounded-2xl border p-4 text-left transition-colors ${
                      form.type === t.value ? 'border-brand-400 ring-2 ring-brand-100' : 'border-slate-100 hover:border-brand-200'
                    }`}
                  >
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${t.tone}`}>
                      <t.icon size={20} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{t.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Tanggal Mulai</label>
                  <input type="date" required className="input" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} />
                </div>
                <div>
                  <label className="label">Tanggal Selesai</label>
                  <input type="date" required className="input" value={form.endDate} onChange={(e) => update('endDate', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Alasan</label>
                <textarea required rows={3} className="input" value={form.reason} onChange={(e) => update('reason', e.target.value)} placeholder="Jelaskan alasan pengajuan" />
              </div>
              {form.type === 'SAKIT' && (
                <div>
                  <label className="label">Lampiran Bukti (opsional)</label>
                  <input type="file" className="input" onChange={(e) => update('attachment', e.target.files?.[0] || null)} />
                </div>
              )}

              {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">{error}</p>}

              <div className="flex justify-between pt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">Batalkan</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Mengirim...' : 'Selanjutnya'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <p className="text-base font-semibold text-slate-700">Pengajuan berhasil dikirim.</p>
              <p className="mt-1 text-sm text-slate-500">Menunggu persetujuan dari admin/HR.</p>
              <button onClick={resetForm} className="btn-primary mt-5">Ajukan Lagi</button>
            </div>
          )}
        </div>

        <div className="card p-5 lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-slate-700">Riwayat Pengajuan</p>
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">{h.type}</p>
                  <AttendanceStatus status={h.status} />
                </div>
                <p className="mt-1 text-xs text-slate-400">{h.startDate} — {h.endDate}</p>
                <p className="mt-1 text-xs text-slate-500">{h.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
