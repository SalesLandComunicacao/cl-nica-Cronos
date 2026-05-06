import type { Procedure, ProcedureCategory } from './types'

export const PROCEDURES: Procedure[] = [
  { id: 'implante', label: 'Implante', category: 'foco' },
  { id: 'protese', label: 'Prótese', category: 'foco' },

  { id: 'facetas-resina', label: 'Facetas em resina', category: 'estetico-dentario' },
  { id: 'clareamento', label: 'Clareamento', category: 'estetico-dentario' },
  { id: 'lentes-porcelana', label: 'Lentes de porcelana', category: 'estetico-dentario' },

  { id: 'botox', label: 'Botox', category: 'estetico-facial' },
  { id: 'preenchimento', label: 'Preenchimento', category: 'estetico-facial' },

  { id: 'canal', label: 'Canal', category: 'clinico' },
  { id: 'extracao', label: 'Extração', category: 'clinico' },
  { id: 'restauracao', label: 'Restauração', category: 'clinico' },
  { id: 'coroa', label: 'Coroa', category: 'clinico' },
  { id: 'bloco', label: 'Bloco', category: 'clinico' },
  { id: 'reconstrucao', label: 'Reconstrução', category: 'clinico' },
]

export const CATEGORY_LABELS: Record<ProcedureCategory, string> = {
  foco: 'Foco',
  'estetico-dentario': 'Estético dentário',
  'estetico-facial': 'Estético facial',
  clinico: 'Clínico',
}

export const PROCEDURES_BY_CATEGORY = (Object.keys(CATEGORY_LABELS) as ProcedureCategory[])
  .map(cat => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    items: PROCEDURES.filter(p => p.category === cat),
  }))

export function findProcedure(id: string): Procedure | undefined {
  return PROCEDURES.find(p => p.id === id)
}

export function procedureLabel(id: string): string {
  return findProcedure(id)?.label ?? id
}
