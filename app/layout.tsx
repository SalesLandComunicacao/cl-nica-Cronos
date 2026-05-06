import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clínica Cronos | Sistema de Agenda',
  description: 'Microsistema de agendamento da Clínica Cronos com I.A integrada',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
