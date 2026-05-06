'use client'

type Tone = 'default' | 'danger'

interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  confirmTone?: Tone
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  confirmTone = 'default',
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-sm bg-paper border border-rule rounded-md p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
          confirmação
        </p>
        <h3 className="font-serif text-xl leading-tight text-ink mb-2">{title}</h3>
        <p className="text-sm text-muted mb-6 leading-relaxed">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-md border border-rule text-sm text-ink-soft hover:bg-paper-warm transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 h-10 rounded-md text-sm font-medium transition-colors ${
              confirmTone === 'danger'
                ? 'bg-paper border border-ink text-ink hover:bg-ink hover:text-paper'
                : 'bg-ink text-paper hover:bg-ink-soft'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
