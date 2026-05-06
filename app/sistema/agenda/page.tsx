'use client'

import { useEffect, useMemo, useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import DateNavigator from '../components/DateNavigator'
import NewAppointmentModal from '../components/NewAppointmentModal'
import StatusToggle from '../components/StatusToggle'
import { api, useAppointments } from '../lib/api'
import { procedureLabel } from '../lib/procedures'
import {
  formatDateLong,
  generateSlots,
  isClosed,
  todayISO,
} from '../lib/schedule'
import type { Appointment, AppointmentStatus } from '../lib/types'

export default function AgendaPage() {
  const [date, setDate] = useState<string>(todayISO())
  const [modalOpen, setModalOpen] = useState(false)
  const [presetTime, setPresetTime] = useState<string | undefined>(undefined)
  const [confirmRemoval, setConfirmRemoval] = useState<Appointment | null>(null)
  const [toast, setToast] = useState<{ msg: string; tone: 'success' | 'error' } | null>(null)

  const { appointments, loading, refresh } = useAppointments(date)

  const closedDay = useMemo(() => isClosed(date), [date])
  const daySlots = useMemo(() => generateSlots(date), [date])
  const takenSlots = useMemo(
    () => appointments.map(a => a.time),
    [appointments],
  )

  const showToast = (msg: string, tone: 'success' | 'error' = 'success') => {
    setToast({ msg, tone })
  }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const openModal = (time?: string) => {
    setPresetTime(time)
    setModalOpen(true)
  }

  const handleStatusChange = async (appt: Appointment, status: AppointmentStatus) => {
    try {
      await api.update(appt.id, { status })
      showToast(status === 'confirmado' ? 'Confirmado!' : 'Status atualizado.')
      refresh()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao atualizar.', 'error')
    }
  }

  const handleRemove = async () => {
    if (!confirmRemoval) return
    try {
      await api.remove(confirmRemoval.id)
      showToast('Agendamento removido.')
      refresh()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao remover.', 'error')
    } finally {
      setConfirmRemoval(null)
    }
  }

  const apptByTime = new Map(appointments.map(a => [a.time, a]))

  return (
    <div className="space-y-6 fade-in">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-xl fade-in ${
            toast.tone === 'success'
              ? 'bg-teal-500 shadow-teal-500/30'
              : 'bg-red-500 shadow-red-500/30'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Agenda</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5 md:hidden">
            {formatDateLong(date)}
          </p>
          <p className="hidden md:block text-sm text-[var(--text-muted)] mt-0.5">
            {appointments.length} {appointments.length === 1 ? 'consulta' : 'consultas'} no dia
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo agendamento
        </button>
      </div>

      <div className="glass-card p-4 md:p-5">
        <DateNavigator date={date} onChange={setDate} />
      </div>

      {closedDay ? (
        <ClosedNotice />
      ) : loading ? (
        <SkeletonList />
      ) : (
        <div className="space-y-2">
          {daySlots.map(time => {
            const appt = apptByTime.get(time)
            return (
              <SlotRow
                key={time}
                time={time}
                appointment={appt}
                onAdd={() => openModal(time)}
                onStatusChange={status => appt && handleStatusChange(appt, status)}
                onRemove={() => appt && setConfirmRemoval(appt)}
              />
            )
          })}
        </div>
      )}

      <NewAppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultDate={date}
        defaultTime={presetTime}
        takenSlots={takenSlots}
        onCreated={() => {
          showToast('Agendamento criado!')
          refresh()
        }}
      />

      <ConfirmDialog
        isOpen={!!confirmRemoval}
        title="Remover agendamento"
        message={
          confirmRemoval
            ? `Confirma a remoção da consulta de ${confirmRemoval.patientName} às ${confirmRemoval.time}? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Remover"
        confirmColor="red"
        onConfirm={handleRemove}
        onCancel={() => setConfirmRemoval(null)}
      />
    </div>
  )
}

function SlotRow({
  time,
  appointment,
  onAdd,
  onStatusChange,
  onRemove,
}: {
  time: string
  appointment?: Appointment
  onAdd: () => void
  onStatusChange: (status: AppointmentStatus) => void
  onRemove: () => void
}) {
  if (!appointment) {
    return (
      <button
        onClick={onAdd}
        className="w-full flex items-center gap-4 p-4 rounded-xl border border-dashed border-[var(--border)] hover:border-teal-500/40 hover:bg-teal-500/5 text-left transition-colors group"
      >
        <span className="w-16 text-base font-semibold text-[var(--text-muted)] group-hover:text-teal-400 transition-colors">
          {time}
        </span>
        <span className="flex-1 text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
          Disponível
        </span>
        <span className="text-xs text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agendar
        </span>
      </button>
    )
  }

  return (
    <div className="glass-card p-4 hover:border-teal-500/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="w-16 shrink-0">
          <span className="text-base font-bold text-teal-400">{time}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {appointment.patientName}
          </p>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-0.5">
            <span>{procedureLabel(appointment.procedureId)}</span>
            <span>•</span>
            <span className="font-mono">{appointment.patientPhone}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <StatusToggle
            status={appointment.status}
            onChange={onStatusChange}
          />
          <button
            onClick={onRemove}
            aria-label="Remover agendamento"
            className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function ClosedNotice() {
  return (
    <div className="glass-card p-12 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--border)]/30 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)]">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="9" y1="14" x2="15" y2="20" />
          <line x1="15" y1="14" x2="9" y2="20" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-[var(--text-primary)]">
        Consultório fechado
      </h3>
      <p className="text-sm text-[var(--text-muted)] mt-1">
        Domingo o consultório não atende. Selecione outro dia.
      </p>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl bg-white/[0.02] border border-[var(--border)] animate-pulse"
        />
      ))}
    </div>
  )
}
