'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import AppointmentDetailModal from '../components/AppointmentDetailModal'
import ConfirmDialog from '../components/ConfirmDialog'
import DateNavigator from '../components/DateNavigator'
import NewAppointmentModal from '../components/NewAppointmentModal'
import WeekGrid from '../components/WeekGrid'
import WeekNavigator from '../components/WeekNavigator'
import { api } from '../lib/api'
import { procedureLabel } from '../lib/procedures'
import {
  formatDateLong,
  generateSlots,
  getWeekDays,
  getWeekStart,
  isClosed,
  todayISO,
} from '../lib/schedule'
import type { Appointment, AppointmentStatus } from '../lib/types'

const STORE_EVENT = 'clinica-cronos:appointments-changed'

export default function AgendaPage() {
  const [weekStart, setWeekStart] = useState<string>(() => getWeekStart(todayISO()))
  const [mobileDate, setMobileDate] = useState<string>(todayISO())
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const [newModalOpen, setNewModalOpen] = useState(false)
  const [newModalDate, setNewModalDate] = useState<string>(todayISO())
  const [newModalTime, setNewModalTime] = useState<string | undefined>(undefined)

  const [detailAppt, setDetailAppt] = useState<Appointment | null>(null)
  const [confirmRemoval, setConfirmRemoval] = useState<Appointment | null>(null)

  const [toast, setToast] = useState<{ msg: string; tone: 'ok' | 'err' } | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const all = await api.list()
      setAllAppointments(all)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    if (typeof window !== 'undefined') {
      window.addEventListener(STORE_EVENT, handler)
      return () => window.removeEventListener(STORE_EVENT, handler)
    }
  }, [refresh])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const showToast = (msg: string, tone: 'ok' | 'err' = 'ok') => setToast({ msg, tone })

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart])
  const weekAppointments = useMemo(() => {
    const days = new Set(weekDays)
    return allAppointments.filter(a => days.has(a.date))
  }, [allAppointments, weekDays])

  const dayAppointments = useMemo(
    () => allAppointments.filter(a => a.date === mobileDate).sort((a, b) => a.time.localeCompare(b.time)),
    [allAppointments, mobileDate],
  )

  const dayTaken = useMemo(() => dayAppointments.map(a => a.time), [dayAppointments])

  const openNewModal = (date?: string, time?: string) => {
    setNewModalDate(date ?? todayISO())
    setNewModalTime(time)
    setNewModalOpen(true)
  }

  const handleStatusChange = async (appt: Appointment, status: AppointmentStatus) => {
    try {
      await api.update(appt.id, { status })
      showToast(status === 'confirmado' ? 'Confirmado.' : 'Status atualizado.')
      setDetailAppt(prev => (prev ? { ...prev, status } : null))
      refresh()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao atualizar.', 'err')
    }
  }

  const handleRemove = async () => {
    if (!confirmRemoval) return
    try {
      await api.remove(confirmRemoval.id)
      showToast('Agendamento removido.')
      setDetailAppt(null)
      refresh()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao remover.', 'err')
    } finally {
      setConfirmRemoval(null)
    }
  }

  const closedMobileDay = isClosed(mobileDate)

  return (
    <div className="px-4 md:px-8 py-6 md:py-8 reveal">
      {toast && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md text-xs font-mono uppercase tracking-[0.18em] shadow-sm fade-in ${
            toast.tone === 'ok'
              ? 'bg-ink text-paper'
              : 'bg-paper border border-ink text-ink'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6 md:mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
            agenda
          </p>
          <h2 className="font-serif text-3xl md:text-[36px] leading-none tracking-wordmark text-ink">
            Visão semanal
          </h2>
        </div>
        <button
          onClick={() => openNewModal(mobileDate)}
          className="self-start md:self-auto inline-flex items-center gap-2 h-10 px-4 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink-soft transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo agendamento
        </button>
      </div>

      <div className="hidden md:block space-y-5">
        <WeekNavigator weekStart={weekStart} onChange={setWeekStart} />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <WeekGrid
            weekStart={weekStart}
            appointments={weekAppointments}
            onSlotClick={(d, t) => openNewModal(d, t)}
            onAppointmentClick={appt => setDetailAppt(appt)}
          />
        )}
        <Legend count={weekAppointments.length} />
      </div>

      <div className="md:hidden space-y-4">
        <DateNavigator date={mobileDate} onChange={setMobileDate} />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          {formatDateLong(mobileDate)}
        </p>

        {closedMobileDay ? (
          <ClosedNotice />
        ) : loading ? (
          <SkeletonList />
        ) : (
          <div className="border border-rule rounded-md divide-y divide-rule-soft">
            {generateSlots(mobileDate).map(time => {
              const appt = dayAppointments.find(a => a.time === time)
              return (
                <SlotRow
                  key={time}
                  time={time}
                  appointment={appt}
                  onAdd={() => openNewModal(mobileDate, time)}
                  onClick={() => appt && setDetailAppt(appt)}
                />
              )
            })}
          </div>
        )}
      </div>

      <NewAppointmentModal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        defaultDate={newModalDate}
        defaultTime={newModalTime}
        takenSlots={
          newModalDate
            ? allAppointments.filter(a => a.date === newModalDate).map(a => a.time)
            : []
        }
        onCreated={() => {
          showToast('Agendamento criado.')
          refresh()
        }}
      />

      <AppointmentDetailModal
        appointment={detailAppt}
        onClose={() => setDetailAppt(null)}
        onStatusChange={status => detailAppt && handleStatusChange(detailAppt, status)}
        onRemove={() => detailAppt && setConfirmRemoval(detailAppt)}
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
        confirmTone="danger"
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
  onClick,
}: {
  time: string
  appointment?: Appointment
  onAdd: () => void
  onClick: () => void
}) {
  if (!appointment) {
    return (
      <button
        onClick={onAdd}
        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-paper-warm text-left transition-colors group"
      >
        <span className="font-mono text-[11px] tabular text-muted w-12">{time}</span>
        <span className="text-sm text-muted group-hover:text-ink transition-colors">
          Disponível
        </span>
      </button>
    )
  }

  const confirmed = appointment.status === 'confirmado'

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-paper-warm text-left transition-colors"
    >
      <span className="font-mono text-[11px] tabular text-ink w-12">{time}</span>
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          confirmed ? 'bg-ink' : 'border border-ink'
        }`}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{appointment.patientName}</p>
        <p className="text-[11px] text-muted truncate mt-0.5">
          {procedureLabel(appointment.procedureId)} · {appointment.patientPhone}
        </p>
      </div>
    </button>
  )
}

function ClosedNotice() {
  return (
    <div className="border border-rule rounded-md py-12 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        consultório fechado
      </p>
      <p className="font-serif text-xl text-ink mt-2">Domingo</p>
      <p className="text-sm text-muted mt-1">Selecione outro dia</p>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="border border-rule rounded-md h-[400px] bg-paper-warm/30 animate-pulse" />
  )
}

function SkeletonList() {
  return (
    <div className="border border-rule rounded-md divide-y divide-rule-soft">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-12 bg-paper-warm/30 animate-pulse" />
      ))}
    </div>
  )
}

function Legend({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        {count} {count === 1 ? 'consulta' : 'consultas'} na semana
      </p>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full border border-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            agendado
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            confirmado
          </span>
        </div>
      </div>
    </div>
  )
}
