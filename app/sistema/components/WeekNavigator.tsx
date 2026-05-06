'use client'

import {
  formatWeekRange,
  getWeekStart,
  shiftDate,
  todayISO,
} from '../lib/schedule'

type Props = {
  weekStart: string
  onChange: (weekStart: string) => void
}

export default function WeekNavigator({ weekStart, onChange }: Props) {
  const isCurrentWeek = weekStart === getWeekStart(todayISO())

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(shiftDate(weekStart, -7))}
        aria-label="Semana anterior"
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-rule text-ink-soft hover:bg-paper-warm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => onChange(getWeekStart(todayISO()))}
        disabled={isCurrentWeek}
        className={`px-3 h-9 inline-flex items-center rounded-md text-xs font-medium border transition-colors ${
          isCurrentWeek
            ? 'border-ink bg-ink text-paper cursor-default'
            : 'border-rule text-ink-soft hover:bg-paper-warm'
        }`}
      >
        Hoje
      </button>

      <button
        onClick={() => onChange(shiftDate(weekStart, 7))}
        aria-label="Próxima semana"
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-rule text-ink-soft hover:bg-paper-warm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="font-serif text-base md:text-lg text-ink ml-1">
        {formatWeekRange(weekStart)}
      </div>
    </div>
  )
}
