import type { Metadata } from 'next'
import html from './content'

export const metadata: Metadata = {
  title: 'Proposta Comercial — Dr. Felipe Fernandes × Salesland',
  description: 'Sistema inteligente de atendimento e agendamento com I.A para clínica odontológica',
}

export default function Proposta() {
  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
