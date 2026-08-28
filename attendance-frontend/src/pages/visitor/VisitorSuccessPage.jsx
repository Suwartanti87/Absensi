import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'

export default function VisitorSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Users size={30} />
      </div>
      <h1 className="text-lg font-bold text-slate-800">Terima kasih atas kunjungan Anda.</h1>
      <p className="mt-1 text-sm text-slate-500">Kami akan menyambut Anda dengan baik.</p>
      <Link to="/" className="btn-primary mt-6">Kembali ke Beranda</Link>
    </div>
  )
}
