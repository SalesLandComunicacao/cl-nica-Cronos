export type ProcedureCategory =
  | 'foco'
  | 'estetico-dentario'
  | 'estetico-facial'
  | 'clinico'

export type Procedure = {
  id: string
  label: string
  category: ProcedureCategory
}

export type AppointmentStatus = 'agendado' | 'confirmado'

export type Appointment = {
  id: string
  patientName: string
  patientPhone: string
  date: string
  time: string
  procedureId: string
  status: AppointmentStatus
  createdAt: string
  updatedAt: string
}

export type NewAppointmentInput = Omit<
  Appointment,
  'id' | 'status' | 'createdAt' | 'updatedAt'
> & { status?: AppointmentStatus }

export type AvailabilityResponse = {
  date: string
  dayLabel: string
  isClosed: boolean
  slots: Array<{
    time: string
    available: boolean
    appointmentId?: string
  }>
}
