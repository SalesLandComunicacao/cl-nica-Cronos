export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

type DaySchedule = {
  isOpen: boolean
  startHour: number
  endHour: number
}

const SCHEDULE: Record<DayOfWeek, DaySchedule> = {
  0: { isOpen: false, startHour: 0, endHour: 0 },
  1: { isOpen: true, startHour: 8, endHour: 19 },
  2: { isOpen: true, startHour: 8, endHour: 19 },
  3: { isOpen: true, startHour: 8, endHour: 19 },
  4: { isOpen: true, startHour: 8, endHour: 19 },
  5: { isOpen: true, startHour: 8, endHour: 19 },
  6: { isOpen: true, startHour: 8, endHour: 13 },
}

const DAY_LABELS_FULL = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const

const DAY_LABELS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const

const MONTH_LABELS = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
] as const

export const WEEK_HOURS = Array.from({ length: 11 }, (_, i) => 8 + i)

export function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`)
}

export function getDayOfWeek(dateStr: string): DayOfWeek {
  return parseDate(dateStr).getDay() as DayOfWeek
}

export function getDaySchedule(dateStr: string): DaySchedule {
  return SCHEDULE[getDayOfWeek(dateStr)]
}

export function isClosed(dateStr: string): boolean {
  return !getDaySchedule(dateStr).isOpen
}

export function isHourOpen(dateStr: string, hour: number): boolean {
  const s = getDaySchedule(dateStr)
  return s.isOpen && hour >= s.startHour && hour < s.endHour
}

export function generateSlots(dateStr: string): string[] {
  const schedule = getDaySchedule(dateStr)
  if (!schedule.isOpen) return []
  const slots: string[] = []
  for (let h = schedule.startHour; h < schedule.endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
  }
  return slots
}

export function formatHour(hour: number): string {
  return `${String(hour).padStart(2, '0')}:00`
}

export function formatDateLong(dateStr: string): string {
  const d = parseDate(dateStr)
  return `${DAY_LABELS_FULL[d.getDay()]}, ${d.getDate()} de ${d.toLocaleDateString('pt-BR', { month: 'long' })} de ${d.getFullYear()}`
}

export function formatDateShort(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('pt-BR')
}

export function todayISO(): string {
  return toISO(new Date())
}

function toISO(d: Date): string {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

export function shiftDate(dateStr: string, days: number): string {
  const d = parseDate(dateStr)
  d.setDate(d.getDate() + days)
  return toISO(d)
}

export function dayLabelShort(dateStr: string): string {
  return DAY_LABELS_SHORT[getDayOfWeek(dateStr)]
}

export function dayLabel(dateStr: string): string {
  return DAY_LABELS_FULL[getDayOfWeek(dateStr)]
}

export function monthLabel(dateStr: string): string {
  return MONTH_LABELS[parseDate(dateStr).getMonth()]
}

export function dayNumber(dateStr: string): number {
  return parseDate(dateStr).getDate()
}

export function getWeekStart(dateStr: string): string {
  const d = parseDate(dateStr)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return toISO(d)
}

export function getWeekDays(weekStartISO: string): string[] {
  return Array.from({ length: 7 }, (_, i) => shiftDate(weekStartISO, i))
}

export function formatWeekRange(weekStartISO: string): string {
  const days = getWeekDays(weekStartISO)
  const first = parseDate(days[0])
  const last = parseDate(days[6])
  const sameMonth = first.getMonth() === last.getMonth()
  if (sameMonth) {
    return `${first.getDate()} – ${last.getDate()} ${MONTH_LABELS[first.getMonth()]} ${last.getFullYear()}`
  }
  return `${first.getDate()} ${MONTH_LABELS[first.getMonth()]} – ${last.getDate()} ${MONTH_LABELS[last.getMonth()]} ${last.getFullYear()}`
}
