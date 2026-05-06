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

const DAY_LABELS = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const

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

export function generateSlots(dateStr: string): string[] {
  const schedule = getDaySchedule(dateStr)
  if (!schedule.isOpen) return []
  const slots: string[] = []
  for (let h = schedule.startHour; h < schedule.endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
  }
  return slots
}

export function formatDateLong(dateStr: string): string {
  const d = parseDate(dateStr)
  const day = DAY_LABELS[d.getDay()]
  return `${day}, ${d.getDate()} de ${d.toLocaleDateString('pt-BR', { month: 'long' })} de ${d.getFullYear()}`
}

export function formatDateShort(dateStr: string): string {
  return parseDate(dateStr).toLocaleDateString('pt-BR')
}

export function todayISO(): string {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

export function shiftDate(dateStr: string, days: number): string {
  const d = parseDate(dateStr)
  d.setDate(d.getDate() + days)
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

export function dayLabel(dateStr: string): string {
  return DAY_LABELS[getDayOfWeek(dateStr)]
}
