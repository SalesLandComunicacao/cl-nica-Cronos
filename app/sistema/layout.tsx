'use client'

import { useState } from 'react'
import Sidebar from './components/Sidebar'

export default function SistemaLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-8 border-b border-rule bg-paper sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-md text-ink hover:bg-paper-warm"
              aria-label="Abrir menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="md:hidden">
              <h1 className="font-serif text-lg leading-none tracking-wordmark text-ink">
                Clínica <span className="italic font-medium">Cronos</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-rule">
              <span className="w-1.5 h-1.5 rounded-full bg-ink" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                I.A online
              </span>
            </div>
            <div className="w-8 h-8 rounded-full ink-fill flex items-center justify-center font-serif text-[13px]">
              CC
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  )
}
