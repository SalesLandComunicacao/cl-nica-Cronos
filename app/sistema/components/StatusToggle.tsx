'use client'

import type { AppointmentStatus } from '../lib/types'

type Props = {
  status: AppointmentStatus
  onChange: (status: AppointmentStatus) => void
  disabled?: boolean
}

export default function StatusToggle({ status, onChange, disabled }: Props) {
  const isConfirmed = status === 'confirmado'
  return (
    <button
      onClick={() => onChange(isConfirmed ? 'agendado' : 'confirmado')}
      disabled={disabled}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors
        ${isConfirmed
          ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
          : 'bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20'}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title={isConfirmed ? 'Clique para marcar como agendado' : 'Clique para confirmar'}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isConfirmed ? 'bg-green-400' : 'bg-amber-400'}`} />
      {isConfirmed ? 'Confirmado' : 'Agendado'}
    </button>
  )
}
