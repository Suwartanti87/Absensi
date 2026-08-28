import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Info, Phone, Mail } from 'lucide-react'
import * as visitorService from '../../services/visitorService.js'
import * as visitorLogService from '../../services/visitorLogService.js'

const initialForm = {
  name: '',
  company: '',
  phone: '',
  email: '',
  visitDate: '',
  visitTime: '',
  purpose: '',
  employeeName: '', // nama karyawan yang dituju (backend map ke employeeId)
  note: '',
}

export default function VisitorFormPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // 1) Buat data tamu (tabel `visitor`)
      const visitor = await visitorService.createVisitor({
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
      })
      // 2) Buat log kunjungan (tabel `visitorlog`) yang menghubungkan visitor -> employee
      await visitorLogService.createVisitorLog({
        visitorId: visitor.id,
        employeeName: form.employeeName, // backend bisa cari employeeId dari nama ini
        purpose: form.purpose,
        visitDate: `${form.visitDate} ${form.visitTime}`,
        note: form.note,
      })
      navigate('/visitor/sukses')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Gagal mengirim pengajuan. Backend belum tersambung? cek src/services/visitorService.js'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-4">
          <Link to="/" className="flex items-center gap-1 text-sm font-medium text-brand-600">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        <div className="md:col-span-1 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Form Kunjungan / Janji Temu</h1>
            <p className="mt-1 text-sm text-slate-500">Silakan lengkapi data kunjungan Anda.</p>
          </div>

          <div className="card p-4">
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <ShieldCheck size={18} />
              <p className="text-sm font-semibold text-slate-700">Kunjungan Aman & Nyaman</p>
            </div>
            <p className="text-xs text-slate-500">
              Data Anda akan kami jaga kerahasiaannya dan hanya digunakan untuk keperluan kunjungan.
            </p>
          </div>

          <div className="card p-4">
            <div className="mb-2 flex items-center gap-2 text-brand-600">
              <Info size={18} />
              <p className="text-sm font-semibold text-slate-700">Informasi Kunjungan</p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>• Datang tepat waktu sesuai jadwal janji temu.</li>
              <li>• Laporkan ke resepsionis setibanya di lokasi.</li>
              <li>• Patuhi peraturan yang berlaku di lingkungan kantor.</li>
            </ul>
          </div>

          <div className="card p-4">
            <p className="mb-2 text-sm font-semibold text-slate-700">Butuh Bantuan?</p>
            <p className="mb-2 text-xs text-slate-500">Hubungi resepsionis kami jika ada pertanyaan.</p>
            <p className="flex items-center gap-2 text-xs text-slate-500"><Phone size={14} /> (021) 1234 5678</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-500"><Mail size={14} /> resepsionis@perusahaan.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6 md:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Nama Lengkap *</label>
              <input className="input" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Masukkan nama lengkap Anda" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Nama Perusahaan / Instansi *</label>
              <input className="input" required value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Masukkan nama perusahaan / instansi" />
            </div>
            <div>
              <label className="label">No. Telepon *</label>
              <input className="input" required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="08xx xxxx xxxx" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="nama@email.com" />
            </div>
            <div>
              <label className="label">Tanggal Kunjungan *</label>
              <input type="date" className="input" required value={form.visitDate} onChange={(e) => update('visitDate', e.target.value)} />
            </div>
            <div>
              <label className="label">Waktu Kunjungan *</label>
              <input type="time" className="input" required value={form.visitTime} onChange={(e) => update('visitTime', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Tujuan Kunjungan *</label>
              <input className="input" required value={form.purpose} onChange={(e) => update('purpose', e.target.value)} placeholder="Contoh: Meeting, Interview, Konsultasi, dll" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Dengan Siapa *</label>
              <input className="input" required value={form.employeeName} onChange={(e) => update('employeeName', e.target.value)} placeholder="Masukkan nama karyawan yang dituju" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Catatan Tambahan (Opsional)</label>
              <textarea className="input" rows={3} value={form.note} onChange={(e) => update('note', e.target.value)} placeholder="Tuliskan informasi tambahan jika diperlukan" />
            </div>
          </div>

          <p className="rounded-xl bg-brand-50 px-3 py-2.5 text-xs text-brand-700">
            Pastikan data yang Anda masukkan sudah benar. Kunjungan Anda akan dikonfirmasi oleh pihak kami.
          </p>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </form>
      </div>
    </div>
  )
}
