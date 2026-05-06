export default function DashboardPage() {
  return (
    <div className="space-y-8 fade-in">
      <div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Dashboard</h2>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          Métricas em tempo real da operação
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiSkeleton label="Atendidos" hint="pacientes que iniciaram contato" />
        <KpiSkeleton label="Agendados" hint="consultas marcadas no período" />
        <KpiSkeleton label="Confirmados" hint="presença confirmada" />
      </div>

      <div className="glass-card p-12 text-center glow-accent">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Em breve
        </h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
          Estamos construindo as métricas do seu consultório. Em breve você verá
          aqui o desempenho da sua I.A de atendimento, taxa de confirmação e
          volume de agendamentos.
        </p>
      </div>
    </div>
  )
}

function KpiSkeleton({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="glass-card p-5 opacity-50 select-none">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          {label}
        </span>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
          Em breve
        </span>
      </div>
      <p className="text-3xl font-bold text-[var(--text-muted)]">—</p>
      <p className="text-xs text-[var(--text-muted)] mt-1">{hint}</p>
    </div>
  )
}
