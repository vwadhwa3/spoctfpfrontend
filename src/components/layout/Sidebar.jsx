import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutGrid, Folder, BookUser, Settings, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/spoc/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/spoc/cases', label: 'Cases', icon: Folder },
  { to: '/spoc/directory', label: 'Directory', icon: BookUser },
]

const itemClass = ({ isActive }) =>
  `flex items-center gap-3.5 border-l-2 py-3 pl-3.5 pr-4 text-base transition-colors ${
    isActive
      ? 'border-white bg-primary-soft font-medium text-white'
      : 'border-transparent text-white/85 hover:bg-white/5 hover:text-white'
  }`

function Sidebar({ role = 'SPOC', subtitle = 'Administrator role' }) {
  const navigate = useNavigate()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-primary pl-8 text-white">
      <div className="pt-12">
        <img src="/logo.svg" alt="The Flying Panda" className="h-14 w-auto object-contain" />
      </div>

      <div className="mt-16">
        <p className="text-xl font-semibold leading-tight">{role}</p>
        <p className="mt-1 text-[15px] text-white/80">{subtitle}</p>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={itemClass}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mb-10 mt-auto flex flex-col gap-2">
        <NavLink to="/spoc/settings" className={itemClass}>
          <Settings className="h-5 w-5" strokeWidth={1.75} />
          Settings
        </NavLink>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="flex items-center gap-3.5 border-l-2 border-transparent py-3 pl-3.5 pr-4 text-left text-base text-white/85 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-5 w-5" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
