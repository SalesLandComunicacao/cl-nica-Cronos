'use client'

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function isValidPhone(masked: string): boolean {
  const digits = masked.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

type Props = {
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  id?: string
  className?: string
}

export default function PhoneInput({
  value,
  onChange,
  required,
  placeholder = '(85) 99999-9999',
  id,
  className,
}: Props) {
  return (
    <input
      id={id}
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      value={value}
      onChange={e => onChange(maskPhone(e.target.value))}
      placeholder={placeholder}
      required={required}
      className={
        className ??
        'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all'
      }
    />
  )
}
