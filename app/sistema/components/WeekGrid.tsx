'use client'

import { procedureLabel } from '../lib/procedures'
import {
  dayLabelShort,
  dayNumber,
  formatHour,
  getDaySchedule,
  getWeekDays,
  isHourOpen,
  todayISO,
  WEEK_HOURS,
} from '../lib/schedule'
import type { Appointment } from '../lib/types'

type Props = {
  weekStart: string
  appointments: Appointment[]
  onSlotClick: (date: string, time: string) => void
  onAppointmentClick: (appointment: Appointment) => void
}

export default function WeekGrid({
  weekStart,
  appointments,
  onSlotClick,
  onAppointmentClick,
}: Props) {
  const days = getWeekDays(weekStart)
  const today = todayISO()

  const byKey = new Map<string, Appointment>()
  for (const a of appointments) {
    byKey.set(`${a.date}__${a.time}`, a)
  }

  return (
    <div className="border border-rule rounded-md overflow-hidden bg-paper">
      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          <div className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] border-b border-rule">
            <div className="border-r border-rule" />
            {days.map(date => {
              const isToday = date === today
              const closed = !getDaySchedule(date).isOpen
              return (
                <div
                  key={date}
                  className={`px-3 py-3 border-r last:border-r-0 border-rule ${
                    isToday ? 'bg-paper-warm' : ''
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {dayLabelShort(date)}
                  </p>
                  <p
                    className={`font-serif text-2xl leading-none mt-1 tabular ${
                      isToday ? 'text-ink' : closed ? 'text-muted-soft' : 'text-ink'
                    }`}
                  >
                    {dayNumber(date)}
                  </p>
                  {closed && (
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-soft mt-1">
                      fechado
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div>
            {WEEK_HOURS.map((hour, hourIdx) => (
              <div
                key={hour}
                className={`grid grid-cols-[60px_repeat(7,minmax(0,1fr))] ${
                  hourIdx < WEEK_HOURS.length - 1 ? 'border-b border-rule-soft' : ''
                }`}
              >
                <div className="border-r border-rule px-3 py-2 flex items-start">
                  <span className="font-mono text-[10px] tabular text-muted">
                    {formatHour(hour)}
                  </span>
                </div>

                {days.map(date => {
                  const open = isHourOpen(date, hour)
                  const time = formatHour(hour)
                  const appt = byKey.get(`${date}__${time}`)

                  if (!open) {
                    return (
                      <div
                        key={`${date}-${hour}`}
                        className="border-r last:border-r-0 border-rule h-[68px] bg-paper-warm/50"
                      />
                    )
                  }

                  if (appt) {
                    return (
                      <button
                        key={`${date}-${hour}`}
                        onClick={() => onAppointmentClick(appt)}
                        className="border-r last:border-r-0 border-rule h-[68px] p-1.5 text-left group"
                      >
                        <AppointmentChip appt={appt} />
                      </button>
                    )
                  }

                  return (
                    <button
                      key={`${date}-${hour}`}
                      onClick={() => onSlotClick(date, time)}
                      className="border-r last:border-r-0 border-rule h-[68px] hover:bg-paper-warm transition-colors group relative"
                      aria-label={`Agendar ${dayLabelShort(date)} ${time}`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                          + agendar
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AppointmentChip({ appt }: { appt: Appointment }) {
  const confirmed = appt.status === 'confirmado'
  return (
    <div
      className={`
        h-full w-full rounded-sm px-2 py-1.5 flex flex-col justify-between
        transition-all duration-150 group-hover:scale-[1.01]
        ${confirmed
          ? 'bg-ink text-paper'
          : 'bg-paper border border-ink text-ink'}
      `}
    >
      <div className="overflow-hidden">
        <p className="font-medium text-[12px] leading-tight truncate">
          {appt.patientName}
        </p>
        <p
          className={`text-[10px] leading-tight truncate mt-0.5 ${
            confirmed ? 'text-paper/70' : 'text-muted'
          }`}
        >
          {procedureLabel(appt.procedureId)}
        </p>
      </div>
      <p
        className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
          confirmed ? 'text-paper/60' : 'text-muted'
        }`}
      >
        {confirmed ? '● confirmado' : '○ agendado'}
      </p>
    </div>
  )
}
