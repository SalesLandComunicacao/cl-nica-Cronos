'use client'

import { procedureLabel } from '../lib/procedures'
import { formatDateLong } from '../lib/schedule'
import type { Appointment, AppointmentStatus } from '../lib/types'

type Props = {
  appointment: Appointment | null
  onClose: () => void
  onStatusChange: (status: AppointmentStatus) => void
  onRemove: () => void
}

export default function AppointmentDetailModal({
  appointment,
  onClose,
  onStatusChange,
  onRemove,
}: Props) {
  if (!appointment) return null
  const confirmed = appointment.status === 'confirmado'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-md bg-paper border border-rule rounded-md overflow-hidden">
        <div className="px-6 pt-6 pb-5 border-b border-rule">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
            agendamento
          </p>
          <h3 className="font-serif text-2xl leading-tight text-ink">
            {appointment.patientName}
          </h3>
          <p className="text-sm text-muted mt-1">
            {procedureLabel(appointment.procedureId)}
          </p>
        </div>

        <div className="px-6 py-5 space-y-3 border-b border-rule">
          <Row label="Data" value={formatDateLong(appointment.date)} />
          <Row label="Horário" value={appointment.time} mono />
          <Row label="Telefone" value={appointment.patientPhone} mono />
          <Row
            label="Status"
            value={
              <span
                className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] ${
                  confirmed ? 'text-ink' : 'text-muted'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    confirmed ? 'bg-ink' : 'border border-ink'
                  }`}
                />
                {confirmed ? 'confirmado' : 'agendado'}
              </span>
            }
          />
        </div>

        <div className="px-6 py-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onRemove}
            className="px-4 h-10 rounded-md border border-rule text-sm text-ink-soft hover:bg-paper-warm transition-colors"
          >
            Remover
          </button>
          <button
            onClick={() => onStatusChange(confirmed ? 'agendado' : 'confirmado')}
            className={`flex-1 h-10 rounded-md text-sm font-medium transition-colors ${
              confirmed
                ? 'border border-ink text-ink hover:bg-paper-warm'
                : 'bg-ink text-paper hover:bg-ink-soft'
            }`}
          >
            {confirmed ? 'Marcar como agendado' : 'Confirmar consulta'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  mono,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
      <span className={`text-sm text-ink text-right ${mono ? 'font-mono tabular' : ''}`}>
        {value}
      </span>
    </div>
  )
}
