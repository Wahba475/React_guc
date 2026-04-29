import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Briefcase, User, LogOut, X, Shield
} from 'lucide-react'

const navItems = [
  { to: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/projects',    label: 'Projects',     icon: FolderKanban },
  { to: '/internships', label: 'Internships',  icon: Briefcase },
  { to: '/profile',     label: 'Profile',      icon: User },
  { to: '/admin',       label: 'Admin',        icon: Shield },
]

export default function Sidebar({ currentUser, onLogout, onClose }) {
  const location = useLocation()

  return (
    <aside className="flex flex-col h-full w-60 bg-white border-r border-[#e5e2e1] py-6 px-4">
      {/* Logo + close (mobile) */}
      <div className="flex items-center justify-between mb-8 px-2">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="w-6 h-6 bg-[#111111] flex items-center justify-center"
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
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to || location.pathname.startsWith(to + '/')
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-150 border
                ${active
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'text-[#444748] border-transparent hover:border-[#111111] hover:text-[#111111]'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Icon size={16} className={active ? 'text-white' : 'text-[#747878]'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-[#e5e2e1] pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 mb-4">
          <div className="w-8 h-8 bg-[#111111] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
              {currentUser?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#111111] truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {currentUser?.name}
            </p>
            <p className="text-[10px] font-semibold text-[#747878] uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
              {currentUser?.role || "Student"}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] border border-[#e5e2e1] hover:border-[#111111] hover:bg-[#fdf8f8] transition-all duration-150"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
