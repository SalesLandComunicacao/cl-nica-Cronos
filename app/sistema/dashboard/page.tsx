export default function DashboardPage() {
  return (
    <div className="px-4 md:px-8 py-6 md:py-8 reveal">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-1.5">
          dashboard
        </p>
        <h2 className="font-serif text-3xl md:text-[36px] leading-none tracking-wordmark text-ink">
          Métricas
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <KpiSkeleton label="Atendidos" hint="pacientes que iniciaram contato" />
        <KpiSkeleton label="Agendados" hint="consultas marcadas no período" />
        <KpiSkeleton label="Confirmados" hint="presença confirmada" />
      </div>

      <div className="border border-rule rounded-md py-16 md:py-20 text-center bg-paper-warm/30">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-ink mb-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-2">
          em construção
        </p>
        <h3 className="font-serif text-2xl text-ink mb-3">Em breve</h3>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          Estamos preparando as métricas do consultório. Em breve você verá aqui o
          desempenho da I.A de atendimento, taxa de confirmação e volume de
          agendamentos.
        </p>
      </div>
    </div>
  )
}

function KpiSkeleton({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="border border-rule rounded-md p-5 bg-paper">
      <div className="flex items-start justify-between mb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          {label}
        </p>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-soft border border-rule rounded-sm px-1.5 py-0.5">
          em breve
        </span>
      </div>
      <p className="font-serif text-4xl text-muted-soft tabular leading-none">—</p>
      <p className="text-[11px] text-muted mt-2 leading-relaxed">{hint}</p>
    </div>
  )
}
