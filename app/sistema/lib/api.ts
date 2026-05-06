'use client'

import { useCallback, useEffect, useState } from 'react'
import { generateSlots, isClosed, dayLabel } from './schedule'
import { readAll, writeAll } from './storage'
import type {
  Appointment,
  AvailabilityResponse,
  NewAppointmentInput,
} from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
const useRemote = Boolean(API_URL)

const STORE_EVENT = 'felipe-fernandes:appointments-changed'

function notifyChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(STORE_EVENT))
}

function makeId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

async function remoteFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${res.status}: ${text || res.statusText}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  async list(date?: string): Promise<Appointment[]> {
    if (useRemote) {
      const qs = date ? `?date=${date}` : ''
      return remoteFetch<Appointment[]>(`/appointments${qs}`)
    }
    const all = readAll()
    return date ? all.filter(a => a.date === date) : all
  },

  async create(input: NewAppointmentInput): Promise<Appointment> {
    if (useRemote) {
      return remoteFetch<Appointment>('/appointments', {
        method: 'POST',
        body: JSON.stringify(input),
      })
    }
    const all = readAll()
    const conflict = all.find(a => a.date === input.date && a.time === input.time)
    if (conflict) {
      throw new Error('Horário já ocupado.')
    }
    const now = new Date().toISOString()
    const appointment: Appointment = {
      id: makeId(),
      patientName: input.patientName.trim(),
      patientPhone: input.patientPhone,
      date: input.date,
      time: input.time,
      procedureId: input.procedureId,
      status: input.status ?? 'agendado',
      createdAt: now,
      updatedAt: now,
    }
    writeAll([...all, appointment])
    notifyChange()
    return appointment
  },

  async update(id: string, patch: Partial<Appointment>): Promise<Appointment> {
    if (useRemote) {
      return remoteFetch<Appointment>(`/appointments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
    }
    const all = readAll()
    const index = all.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Agendamento não encontrado.')
    const updated: Appointment = {
      ...all[index],
      ...patch,
      id: all[index].id,
      updatedAt: new Date().toISOString(),
    }
    if (
      patch.date !== undefined ||
      patch.time !== undefined
    ) {
      const conflict = all.find(
        a => a.id !== id && a.date === updated.date && a.time === updated.time,
      )
      if (conflict) throw new Error('Horário já ocupado.')
    }
    const next = [...all]
    next[index] = updated
    writeAll(next)
    notifyChange()
    return updated
  },

  async remove(id: string): Promise<void> {
    if (useRemote) {
      await remoteFetch<void>(`/appointments/${id}`, { method: 'DELETE' })
      return
    }
    const all = readAll()
    writeAll(all.filter(a => a.id !== id))
    notifyChange()
  },

  async availability(date: string): Promise<AvailabilityResponse> {
    if (useRemote) {
      return remoteFetch<AvailabilityResponse>(`/availability?date=${date}`)
    }
    const closed = isClosed(date)
    if (closed) {
      return { date, dayLabel: dayLabel(date), isClosed: true, slots: [] }
    }
    const all = readAll().filter(a => a.date === date)
    const slots = generateSlots(date).map(time => {
      const taken = all.find(a => a.time === time)
      return {
        time,
        available: !taken,
        appointmentId: taken?.id,
      }
    })
    return { date, dayLabel: dayLabel(date), isClosed: false, slots }
  },
}

export function useAppointments(date: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.list(date)
      setAppointments(data.sort((a, b) => a.time.localeCompare(b.time)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar.')
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    if (typeof window !== 'undefined') {
      window.addEventListener(STORE_EVENT, handler)
      return () => window.removeEventListener(STORE_EVENT, handler)
    }
  }, [refresh])

  return { appointments, loading, error, refresh }
}
