import type { Appointment } from './types'

const KEY = 'clinica-cronos:appointments'

export function readAll(): Appointment[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Appointment[]) : []
  } catch {
    return []
  }
}

export function writeAll(items: Appointment[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(items))
}

export function clearAll(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(KEY)
}
