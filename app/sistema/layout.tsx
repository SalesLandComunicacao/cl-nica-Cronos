'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <main className="flex-1 overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-[var(--text-secondary)] hover:bg-white/5"
              aria-label="Abrir menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">
                Dr. Felipe Fernandes
              </h1>
              <p className="text-[11px] md:text-xs text-[var(--text-muted)]">
                Microsistema de Agendamento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              <span className="text-xs font-medium text-green-400">I.A Online</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              FF
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
