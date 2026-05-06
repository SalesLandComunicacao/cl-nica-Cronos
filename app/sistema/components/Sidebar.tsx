'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  icon: 'calendar' | 'dashboard'
  badge?: string
  disabled?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { href: '/sistema/agenda', label: 'Agenda', icon: 'calendar' },
  { href: '/sistema/dashboard', label: 'Dashboard', icon: 'dashboard', badge: 'Em breve' },
]

export default function Sidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean
  onMobileClose: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {mobileOpen && (
        <button
          onClick={onMobileClose}
          aria-label="Fechar menu"
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-[260px] flex flex-col
          border-r border-[var(--border)] bg-[var(--bg-secondary)]
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center px-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              FF
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Dr. Felipe</p>
              <p className="text-[11px] text-[var(--text-muted)]">Odontologia</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 border border-transparent'}
                `}
              >
                <NavIcon name={item.icon} active={isActive} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center justify-center gap-2 px-3 py-2 opacity-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/salesland-logo.svg" alt="Salesland" className="h-4 invert" />
          </div>
        </div>
      </aside>
    </>
  )
}

function NavIcon({ name, active }: { name: NavItem['icon']; active: boolean }) {
  const stroke = active ? '#14b8a6' : 'currentColor'
  if (name === 'calendar') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
