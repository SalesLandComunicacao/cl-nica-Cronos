'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  icon: 'calendar' | 'dashboard'
  badge?: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/sistema/agenda', label: 'Agenda', icon: 'calendar' },
  { href: '/sistema/dashboard', label: 'Dashboard', icon: 'dashboard', badge: 'em breve' },
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
          className="md:hidden fixed inset-0 z-30 bg-ink/20 backdrop-blur-[2px]"
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-[260px] flex flex-col
          border-r border-rule bg-paper
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="px-6 pt-7 pb-6 border-b border-rule">
          <Link href="/sistema/agenda" onClick={onMobileClose} className="block group">
            <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted mb-1.5">
              odontologia
            </p>
            <h1 className="font-serif text-[26px] leading-none tracking-wordmark text-ink">
              Clínica <span className="italic font-medium">Cronos</span>
            </h1>
            <div className="mt-3 h-px w-8 bg-ink" />
          </Link>
        </div>

        <nav className="flex-1 py-5 px-4 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200
                  ${isActive
                    ? 'bg-ink text-paper font-medium'
                    : 'text-ink-soft hover:bg-paper-warm font-normal'}
                `}
              >
                <NavIcon name={item.icon} active={isActive} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`
                      font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded-sm border
                      ${isActive
                        ? 'border-paper/30 text-paper/70'
                        : 'border-rule text-muted'}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="px-6 py-5 border-t border-rule">
          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted-soft mb-2">
            powered by
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/salesland-logo.svg" alt="Salesland" className="h-3 opacity-50" />
        </div>
      </aside>
    </>
  )
}

function NavIcon({ name, active }: { name: NavItem['icon']; active: boolean }) {
  const stroke = active ? '#FFFFFF' : '#1F1F1F'
  if (name === 'calendar') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="1" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
