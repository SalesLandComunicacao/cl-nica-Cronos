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
        'w-full h-10 px-3 rounded-md bg-paper border border-rule text-sm text-ink placeholder:text-muted-soft focus:outline-none focus:border-ink transition-colors font-mono tabular'
      }
    />
  )
}
