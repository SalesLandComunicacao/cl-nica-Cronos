'use client'

import {
  formatDateLong,
  shiftDate,
  todayISO,
} from '../lib/schedule'

type Props = {
  date: string
  onChange: (date: string) => void
}

export default function DateNavigator({ date, onChange }: Props) {
  const isToday = date === todayISO()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onChange(shiftDate(date, -1))}
        aria-label="Dia anterior"
        className="p-2 rounded-lg border border-[var(--border)] hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <input
        type="date"
        value={date}
        onChange={e => e.target.value && onChange(e.target.value)}
        className="px-3 py-2 rounded-lg bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-teal-500/50 [color-scheme:dark]"
      />

      <button
        onClick={() => onChange(shiftDate(date, 1))}
        aria-label="Próximo dia"
        className="p-2 rounded-lg border border-[var(--border)] hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button
        onClick={() => onChange(todayISO())}
        disabled={isToday}
        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
          isToday
            ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 cursor-default'
            : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
        }`}
      >
        Hoje
      </button>

      <span className="hidden md:inline-block text-sm text-[var(--text-muted)] ml-2">
        {formatDateLong(date)}
      </span>
    </div>
  )
}
