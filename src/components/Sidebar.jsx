import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Briefcase, User, LogOut, X
} from 'lucide-react'

const navItems = [
  { to: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/projects',    label: 'Projects',     icon: FolderKanban },
  { to: '/internships', label: 'Internships',  icon: Briefcase },
  { to: '/profile',     label: 'Profile',      icon: User },
]

export default function Sidebar({ currentUser, onLogout, onClose }) {
  const location = useLocation()

  return (
    <aside className="flex flex-col h-full w-60 bg-white border-r border-[#e5e2e1] py-6 px-4">
      {/* Logo + close (mobile) */}
      <div className="flex items-center justify-between mb-8 px-2">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="w-6 h-6 rounded-sm bg-[#111111] flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'Newsreader', serif" }}>P</span>
          </span>
          <span
            className="text-base font-semibold tracking-tight text-[#111111]"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Portfolia
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-[#747878] hover:text-[#111111] transition-colors lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to || location.pathname.startsWith(to + '/')
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150
                ${active
                  ? 'bg-[#f1edec] text-[#111111] font-semibold'
                  : 'text-[#444748] hover:bg-[#f7f3f2] hover:text-[#111111]'
                }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <Icon size={16} className={active ? 'text-[#6b38d4]' : 'text-[#747878]'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-[#e5e2e1] pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#6b38d4] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#111111] truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {currentUser?.name}
            </p>
            <p className="text-xs text-[#747878] capitalize">{currentUser?.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-[#747878] hover:text-[#DC2626] hover:bg-red-50 transition-all duration-150"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
