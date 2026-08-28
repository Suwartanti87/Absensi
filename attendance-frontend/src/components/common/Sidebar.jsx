import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

/**
 * Sidebar dipakai ulang untuk area karyawan & admin — tinggal kasih
 * daftar menu (`items`) yang berbeda dari masing-masing layout.
 */
export default function Sidebar({ title = 'ABSENSI', subtitle = 'KARYAWAN', items = [] }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-[#0b1b3a] text-white">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-bold">
            {title.slice(0, 1)}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wide">{title}</p>
            <p className="text-[11px] text-blue-200">{subtitle}</p>
          </div>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-card'
                    : 'text-blue-100/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10 p-3">
        {user && (
          <div className="mb-2 flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold">
              {(user.name || user.username || '?').slice(0, 1).toUpperCase()}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{user.name || user.username}</p>
              <p className="text-[11px] text-blue-200">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-blue-100/80 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  )
}
