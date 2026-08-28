import { useAuth } from '../../context/AuthContext.jsx'

export default function PageHeader({ title, subtitle, action }) {
  const { user } = useAuth()
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        {user && (
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-card">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {(user.name || user.username || '?').slice(0, 1).toUpperCase()}
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-slate-700">{user.name || user.username}</p>
              <p className="text-[11px] text-slate-400">{user.role === 'EMPLOYEE' ? 'Karyawan' : user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
