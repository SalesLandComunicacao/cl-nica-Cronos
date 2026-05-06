'use client'

interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  confirmColor: 'green' | 'red' | 'amber' | 'teal'
  onConfirm: () => void
  onCancel: () => void
}

const colorMap: Record<string, string> = {
  green: 'bg-green-500 hover:bg-green-600 shadow-green-500/20',
  red: 'bg-red-500 hover:bg-red-600 shadow-red-500/20',
  amber: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20',
  teal: 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/20',
}

export default function ConfirmDialog({ isOpen, title, message, confirmLabel, confirmColor, onConfirm, onCancel }: Props) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm glass-card p-6 fade-in text-center">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-white/5 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors shadow-lg ${colorMap[confirmColor]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
