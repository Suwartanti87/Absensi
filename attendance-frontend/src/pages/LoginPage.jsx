import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../components/common/Navbar.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // TODO: begitu backend siap, ini akan memanggil POST /auth/login (lihat authServise.js)
      const user = await login(form.username, form.password)
      navigate(user.role === 'ADMIN' || user.role === 'HR_ADMIN' ? '/admin' : '/employee')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Login gagal. Backend belum tersambung? cek src/api/client.js.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar right={<Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">← Kembali</Link>} />
      <div className="mx-auto flex max-w-sm flex-col justify-center px-6 py-20">
        <h1 className="text-xl font-bold text-slate-800">Login Karyawan</h1>
        <p className="mt-1 text-sm text-slate-500">Masuk dengan akun karyawan kamu.</p>

        <form onSubmit={handleSubmit} className="card mt-6 space-y-4 p-6">
          <div>
            <label className="label">Username / Kode Karyawan</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-9"
                placeholder="mis. andi.pratama"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                className="input pl-9"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Tamu / kunjungan? <Link to="/visitor" className="font-semibold text-brand-600">Isi form di sini</Link>
        </p>
      </div>
    </div>
  )
}
