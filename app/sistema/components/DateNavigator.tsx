'use client'

import { shiftDate, todayISO } from '../lib/schedule'

type Props = {
  date: string
  onChange: (date: string) => void
}

export default function DateNavigator({ date, onChange }: Props) {
  const isToday = date === todayISO()

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(shiftDate(date, -1))}
        aria-label="Dia anterior"
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-rule text-ink-soft hover:bg-paper-warm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <input
        type="date"
        value={date}
        onChange={e => e.target.value && onChange(e.target.value)}
        className="flex-1 h-9 px-3 rounded-md bg-paper border border-rule text-sm text-ink focus:outline-none focus:border-ink transition-colors"
      />

      <button
        onClick={() => onChange(shiftDate(date, 1))}
        aria-label="Próximo dia"
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-rule text-ink-soft hover:bg-paper-warm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button
        onClick={() => onChange(todayISO())}
        disabled={isToday}
        className={`px-3 h-9 inline-flex items-center rounded-md text-xs font-medium border transition-colors ${
          isToday
            ? 'border-ink bg-ink text-paper cursor-default'
            : 'border-rule text-ink-soft hover:bg-paper-warm'
        }`}
      >
        Hoje
      </button>
    </div>
  )
}
