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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" />

      <div
        className="relative w-full max-w-lg bg-paper border border-rule rounded-md overflow-hidden"
        style={{ maxHeight: '92vh' }}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-rule">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
              novo registro
            </p>
            <h3 className="font-serif text-2xl leading-tight text-ink">
              Agendamento
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 -mt-1 -mr-1 inline-flex items-center justify-center rounded-md text-muted hover:bg-paper-warm hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4 overflow-y-auto"
          style={{ maxHeight: 'calc(92vh - 100px)' }}
        >
          <Field label="Nome do paciente" required htmlFor="appt-name">
            <input
              id="appt-name"
              type="text"
              value={form.patientName}
              onChange={e => update('patientName', e.target.value)}
              placeholder="Ex: Maria Silva"
              required
              className="w-full h-10 px-3 rounded-md bg-paper border border-rule text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ink transition-colors"
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
              className="w-full h-10 px-3 rounded-md bg-paper border border-rule text-sm text-ink focus:outline-none focus:border-ink transition-colors appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230A0A0A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '36px',
              }}
            >
              <option value="">Selecione o procedimento</option>
              {PROCEDURES_BY_CATEGORY.map(group => (
                <optgroup key={group.category} label={group.label}>
                  {group.items.map(p => (
                    <option key={p.id} value={p.id}>
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
                className="w-full h-10 px-3 rounded-md bg-paper border border-rule text-sm text-ink focus:outline-none focus:border-ink transition-colors"
              />
            </Field>
            <Field label="Horário" required htmlFor="appt-time">
              <select
                id="appt-time"
                value={form.time}
                onChange={e => update('time', e.target.value)}
                required
                disabled={closedDay}
                className="w-full h-10 px-3 rounded-md bg-paper border border-rule text-sm text-ink focus:outline-none focus:border-ink transition-colors appearance-none font-mono tabular disabled:opacity-50"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230A0A0A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: '36px',
                }}
              >
                <option value="">{closedDay ? 'Dia fechado' : 'Selecione'}</option>
                {slotsForDate.map(t => {
                  const taken = occupied.includes(t)
                  return (
                    <option key={t} value={t} disabled={taken}>
                      {t} {taken ? '— ocupado' : ''}
                    </option>
                  )
                })}
              </select>
            </Field>
          </div>

          {closedDay && (
            <p className="text-xs text-ink bg-paper-warm border border-rule rounded-md px-3 py-2">
              Domingo a clínica não atende — escolha outra data.
            </p>
          )}

          {error && (
            <p className="text-xs text-ink bg-paper-warm border border-ink rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-md border border-rule text-sm text-ink-soft hover:bg-paper-warm transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 h-10 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
        className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5"
      >
        {label} {required && <span className="text-ink">*</span>}
      </label>
      {children}
    </div>
  )
}
