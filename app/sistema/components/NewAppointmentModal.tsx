'use client'

import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { PROCEDURES_BY_CATEGORY } from '../lib/procedures'
import {
  generateSlots,
  isClosed as isDateClosed,
  todayISO,
} from '../lib/schedule'
import PhoneInput, { isValidPhone } from './PhoneInput'

type Props = {
  open: boolean
  onClose: () => void
  defaultDate?: string
  defaultTime?: string
  takenSlots: string[]
  onCreated: () => void
}

type FormState = {
  patientName: string
  patientPhone: string
  date: string
  time: string
  procedureId: string
}

const emptyForm = (date: string, time: string): FormState => ({
  patientName: '',
  patientPhone: '',
  date,
  time,
  procedureId: '',
})

export default function NewAppointmentModal({
  open,
  onClose,
  defaultDate,
  defaultTime,
  takenSlots,
  onCreated,
}: Props) {
  const [form, setForm] = useState<FormState>(emptyForm(defaultDate ?? todayISO(), defaultTime ?? ''))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setForm(emptyForm(defaultDate ?? todayISO(), defaultTime ?? ''))
      setError(null)
    }
  }, [open, defaultDate, defaultTime])

  const slotsForDate = useMemo(() => generateSlots(form.date), [form.date])
  const closedDay = useMemo(() => isDateClosed(form.date), [form.date])
  const occupied = useMemo(() => {
    if (form.date === defaultDate) return takenSlots
    return []
  }, [form.date, defaultDate, takenSlots])

  if (!open) return null

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const canSubmit =
    form.patientName.trim().length >= 2 &&
    isValidPhone(form.patientPhone) &&
    form.procedureId !== '' &&
    form.date !== '' &&
    form.time !== '' &&
    !closedDay &&
    !submitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)
    try {
      await api.create({
        patientName: form.patientName.trim(),
        patientPhone: form.patientPhone,
        date: form.date,
        time: form.time,
        procedureId: form.procedureId,
      })
      onCreated()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar agendamento.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg glass-card overflow-hidden fade-in"
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Novo agendamento
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Preencha os dados do paciente
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto"
          style={{ maxHeight: 'calc(90vh - 80px)' }}
        >
          <Field label="Nome do paciente" required htmlFor="appt-name">
            <input
              id="appt-name"
              type="text"
              value={form.patientName}
              onChange={e => update('patientName', e.target.value)}
              placeholder="Ex: Maria Silva"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all"
            />
          </Field>

          <Field label="Telefone" required htmlFor="appt-phone">
            <PhoneInput
              id="appt-phone"
              value={form.patientPhone}
              onChange={v => update('patientPhone', v)}
              required
            />
          </Field>

          <Field label="Procedimento" required htmlFor="appt-procedure">
            <select
              id="appt-procedure"
              value={form.procedureId}
              onChange={e => update('procedureId', e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all appearance-none"
            >
              <option value="" className="bg-[#1a2332]">
                Selecione o procedimento
              </option>
              {PROCEDURES_BY_CATEGORY.map(group => (
                <optgroup key={group.category} label={group.label} className="bg-[#1a2332]">
                  {group.items.map(p => (
                    <option key={p.id} value={p.id} className="bg-[#1a2332]">
                      {p.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Data" required htmlFor="appt-date">
              <input
                id="appt-date"
                type="date"
                value={form.date}
                onChange={e => update('date', e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all [color-scheme:dark]"
              />
            </Field>
            <Field label="Horário" required htmlFor="appt-time">
              <select
                id="appt-time"
                value={form.time}
                onChange={e => update('time', e.target.value)}
                required
                disabled={closedDay}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all appearance-none disabled:opacity-50"
              >
                <option value="" className="bg-[#1a2332]">
                  {closedDay ? 'Dia fechado' : 'Selecione'}
                </option>
                {slotsForDate.map(t => {
                  const taken = occupied.includes(t)
                  return (
                    <option key={t} value={t} disabled={taken} className="bg-[#1a2332]">
                      {t} {taken ? '(ocupado)' : ''}
                    </option>
                  )
                })}
              </select>
            </Field>
          </div>

          {closedDay && (
            <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">
              Domingo o consultório fica fechado. Escolha outra data.
            </p>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 px-4 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {submitting ? 'Agendando…' : 'Agendar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  htmlFor,
  children,
}: {
  label: string
  required?: boolean
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
      >
        {label} {required && <span className="text-teal-400">*</span>}
      </label>
      {children}
    </div>
  )
}
