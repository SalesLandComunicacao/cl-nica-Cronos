const html = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --dark: #080E1A;
    --dark-mid: #0D1526;
    --dark-card: #111D33;
    --dark-light: #1A2A45;
    --teal: #14B8A6;
    --teal-light: #2DD4BF;
    --teal-dim: #0D7D71;
    --teal-glow: rgba(20, 184, 166, 0.12);
    --cyan: #06B6D4;
    --white: #FFFFFF;
    --white-90: rgba(255,255,255,0.90);
    --white-80: rgba(255,255,255,0.80);
    --white-60: rgba(255,255,255,0.60);
    --white-40: rgba(255,255,255,0.40);
    --white-20: rgba(255,255,255,0.20);
    --white-10: rgba(255,255,255,0.10);
    --white-05: rgba(255,255,255,0.05);
    --green: #22C55E;
    --red: #EF4444;
    --amber: #F59E0B;
  }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--dark);
    color: var(--white);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .container { max-width: 900px; margin: 0 auto; padding: 0 24px; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 60px 24px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border: 1px solid var(--teal-dim);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 32px;
    animation: fadeIn 0.8s ease;
  }
  .salesland-logo {
    height: 18px;
    filter: invert(1);
    opacity: 0.9;
  }
  .salesland-logo-lg {
    height: 28px;
    filter: invert(1);
    opacity: 0.9;
  }
  .salesland-logo-sm {
    height: 14px;
    filter: invert(1);
    opacity: 0.6;
  }
  .hero-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .hero-pre {
    font-size: 14px;
    font-weight: 500;
    color: var(--white-40);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 16px;
    animation: fadeIn 1s ease 0.2s both;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 56px);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 24px;
    animation: fadeIn 1s ease 0.4s both;
  }
  .hero h1 .highlight {
    background: linear-gradient(135deg, var(--teal), var(--teal-light), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 17px;
    color: var(--white-60);
    max-width: 580px;
    line-height: 1.7;
    animation: fadeIn 1s ease 0.6s both;
  }
  .hero-cta {
    margin-top: 40px;
    display: flex;
    gap: 16px;
    animation: fadeIn 1s ease 0.8s both;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background: linear-gradient(135deg, var(--teal), var(--teal-dim));
    color: var(--white);
    font-size: 14px;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(20, 184, 166, 0.3);
  }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border: 1px solid var(--white-20);
    color: var(--white-80);
    font-size: 14px;
    font-weight: 500;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s;
    background: none;
    cursor: pointer;
  }
  .btn-outline:hover {
    border-color: var(--teal);
    color: var(--teal);
  }

  /* SECTIONS */
  .section {
    padding: 100px 24px;
    position: relative;
  }
  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 16px;
  }
  .section-label::before {
    content: '';
    width: 20px;
    height: 1px;
    background: var(--teal);
  }
  .section h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  .section-desc {
    font-size: 16px;
    color: var(--white-60);
    max-width: 600px;
    margin-bottom: 48px;
  }
  .divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--white-10), transparent);
    margin: 0;
  }

  /* CARDS */
  .card {
    background: var(--dark-card);
    border: 1px solid var(--white-10);
    border-radius: 20px;
    padding: 40px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }
  .card:hover {
    border-color: var(--teal-dim);
    transform: translateY(-2px);
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--teal), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .card:hover::before { opacity: 1; }

  .card-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: var(--teal-glow);
    border: 1px solid rgba(20, 184, 166, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 24px;
  }
  .card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .card p {
    font-size: 14px;
    color: var(--white-60);
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .feature-list {
    list-style: none;
    display: grid;
    gap: 12px;
  }
  .feature-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: var(--white-80);
  }
  .feature-list li::before {
    content: '✓';
    color: var(--teal);
    font-weight: 700;
    font-size: 13px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (max-width: 768px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
  }

  /* PREVIEW MOCKUP */
  .mockup-container {
    background: var(--dark-card);
    border: 1px solid var(--white-10);
    border-radius: 20px;
    overflow: hidden;
    margin-top: 32px;
  }
  .mockup-topbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    background: var(--dark-mid);
    border-bottom: 1px solid var(--white-10);
  }
  .mockup-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--white-10);
  }
  .mockup-dot.red { background: #EF4444; }
  .mockup-dot.yellow { background: #F59E0B; }
  .mockup-dot.green { background: #22C55E; }
  .mockup-body {
    padding: 24px;
  }
  .mockup-sidebar {
    display: flex;
    gap: 24px;
  }
  .mockup-nav {
    width: 200px;
    flex-shrink: 0;
    padding: 16px;
    border-right: 1px solid var(--white-10);
  }
  .mockup-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
    color: var(--white-40);
    margin-bottom: 4px;
    transition: all 0.2s;
  }
  .mockup-nav-item.active {
    background: var(--teal-glow);
    color: var(--teal);
    border: 1px solid rgba(20, 184, 166, 0.2);
  }
  .mockup-content { flex: 1; }

  /* KPI PREVIEW */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .mockup-sidebar { flex-direction: column; }
    .mockup-nav { width: 100%; border-right: none; border-bottom: 1px solid var(--white-10); }
  }
  .kpi-box {
    background: var(--dark-mid);
    border: 1px solid var(--white-10);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .kpi-box .value {
    font-size: 24px;
    font-weight: 800;
    color: var(--teal);
  }
  .kpi-box .label {
    font-size: 10px;
    color: var(--white-40);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  /* TABLE PREVIEW */
  .table-preview {
    width: 100%;
    border-collapse: collapse;
  }
  .table-preview th {
    text-align: left;
    font-size: 10px;
    font-weight: 600;
    color: var(--white-40);
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--white-10);
  }
  .table-preview td {
    font-size: 13px;
    padding: 12px;
    border-bottom: 1px solid var(--white-05);
    color: var(--white-80);
  }
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
  }
  .status-badge.green { background: rgba(34,197,94,0.1); color: #22C55E; }
  .status-badge.teal { background: rgba(20,184,166,0.1); color: #14B8A6; }
  .status-badge.amber { background: rgba(245,158,11,0.1); color: #F59E0B; }
  .status-badge.red { background: rgba(239,68,68,0.1); color: #EF4444; }

  /* CALENDAR PREVIEW */
  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }
  .cal-header {
    text-align: center;
    font-size: 10px;
    font-weight: 600;
    color: var(--white-40);
    text-transform: uppercase;
    padding: 8px 0;
  }
  .cal-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    color: var(--white-40);
    position: relative;
  }
  .cal-day.has-event { color: var(--white-80); }
  .cal-day.has-event::after {
    content: '';
    position: absolute;
    bottom: 3px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--teal);
  }
  .cal-day.active {
    background: var(--teal);
    color: var(--white);
  }
  .cal-day.today {
    border: 1px solid var(--teal-dim);
    color: var(--white);
  }

  /* PRICING */
  .pricing-card {
    background: var(--dark-card);
    border: 1px solid var(--white-10);
    border-radius: 20px;
    padding: 40px;
    position: relative;
    overflow: hidden;
  }
  .pricing-card.featured {
    border-color: var(--teal-dim);
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, var(--dark-card) 100%);
  }
  .pricing-card.featured::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--teal), var(--cyan));
  }
  .pricing-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid var(--white-05);
  }
  .pricing-item .name {
    font-size: 14px;
    color: var(--white-80);
  }
  .pricing-item .price {
    font-size: 14px;
    font-weight: 600;
    color: var(--white-60);
  }
  .pricing-item .price.crossed {
    text-decoration: line-through;
    color: var(--white-30);
  }
  .pricing-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    margin-top: 8px;
  }
  .pricing-total .label {
    font-size: 12px;
    color: var(--white-40);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  .pricing-total .value {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    color: var(--teal);
  }
  .pricing-total .value small {
    font-size: 14px;
    color: var(--white-40);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
  .pricing-recurrence {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: var(--dark-mid);
    border-radius: 12px;
    margin-top: 20px;
  }
  .pricing-recurrence .label {
    font-size: 13px;
    color: var(--white-60);
  }
  .pricing-recurrence .value {
    font-size: 18px;
    font-weight: 700;
    color: var(--teal-light);
  }

  /* PAYMENT */
  .payment-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 24px;
  }
  @media (max-width: 768px) { .payment-grid { grid-template-columns: 1fr; } }
  .payment-option {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: var(--dark-card);
    border: 1px solid var(--white-10);
    border-radius: 16px;
    transition: all 0.3s;
  }
  .payment-option:hover {
    border-color: var(--teal-dim);
  }
  .payment-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--teal-glow);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .payment-option h4 {
    font-size: 14px;
    font-weight: 600;
    color: var(--white-90);
  }
  .payment-option p {
    font-size: 12px;
    color: var(--white-40);
    margin-top: 2px;
  }

  /* AGENT CARDS */
  .agent-card {
    background: var(--dark-card);
    border: 1px solid var(--white-10);
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s;
  }
  .agent-card:hover {
    border-color: var(--teal-dim);
    transform: translateY(-2px);
  }
  .agent-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .agent-avatar {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  .agent-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
  }
  .agent-type {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--teal);
    margin-top: 2px;
  }
  .agent-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    background: rgba(34, 197, 94, 0.1);
    color: #22C55E;
    margin-bottom: 16px;
  }
  .agent-status::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22C55E;
    animation: pulse 2s ease-in-out infinite;
  }

  /* FLOW */
  .flow-container {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    padding-left: 40px;
  }
  .flow-step {
    position: relative;
    padding: 24px 0 24px 32px;
    border-left: 2px solid var(--white-10);
  }
  .flow-step:last-child { border-left-color: transparent; }
  .flow-step::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 28px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--teal);
    border: 3px solid var(--dark);
  }
  .flow-step h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--white-90);
    margin-bottom: 6px;
  }
  .flow-step p {
    font-size: 13px;
    color: var(--white-40);
    line-height: 1.6;
  }

  /* FOOTER */
  .footer {
    padding: 60px 24px;
    text-align: center;
    border-top: 1px solid var(--white-10);
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .footer p {
    font-size: 13px;
    color: var(--white-40);
  }
  .footer a {
    color: var(--teal);
    text-decoration: none;
  }

  /* CTA SECTION */
  .cta-section {
    text-align: center;
    padding: 80px 24px;
    position: relative;
  }
  .cta-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* STATS ROW */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 48px 0;
  }
  @media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
  .stat-item {
    text-align: center;
    padding: 24px 16px;
    background: var(--dark-card);
    border: 1px solid var(--white-10);
    border-radius: 16px;
  }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--teal);
  }
  .stat-label {
    font-size: 11px;
    color: var(--white-40);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: var(--white-05);
    border: 1px solid var(--white-10);
    border-radius: 8px;
    font-size: 12px;
    color: var(--white-60);
    margin: 3px;
  }
</style>

<!-- ==================== HERO ==================== -->
<div class="hero">
  <div style="margin-bottom: 24px;"><img src="/salesland-logo.svg" alt="Salesland" class="salesland-logo-lg" /></div>
  <div class="hero-badge">Proposta Exclusiva</div>
  <p class="hero-pre">Dr. Felipe Fernandes</p>
  <h1>I.A Inteligente para<br><span class="highlight">Sua Clínica Odontológica</span></h1>
  <p class="hero-sub">
    Sistema completo de atendimento automatizado, agendamento inteligente
    e follow-up — sua recepção funcionando 24 horas, 7 dias por semana,
    sem perder nenhum paciente.
  </p>
  <div class="hero-cta">
    <a href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20fechar%20a%20proposta" class="btn-primary">
      Fechar Proposta →
    </a>
    <a href="#entrega" class="btn-outline">Ver Entrega Completa</a>
  </div>
</div>

<div class="divider"></div>

<!-- ==================== PROBLEMA ==================== -->
<div class="section">
  <div class="container">
    <div class="section-label">O Cenário Atual</div>
    <h2>Pacientes chegam.<br>Mas quantos você <span style="color: var(--teal)">perde</span>?</h2>
    <p class="section-desc">
      Enquanto sua clínica está fechada ou sua equipe ocupada atendendo,
      leads entram pelo WhatsApp e ficam sem resposta. Cada minuto de espera
      é um paciente que vai para o concorrente.
    </p>

    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-value">78%</div>
        <div class="stat-label">dos leads respondem<br>nos primeiros 5 min</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">3x</div>
        <div class="stat-label">mais agendamentos<br>com resposta imediata</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">65%</div>
        <div class="stat-label">dos no-shows evitados<br>com confirmação 24h</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">24/7</div>
        <div class="stat-label">atendimento<br>sem pausas</div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ==================== ENTREGA ==================== -->
<div class="section" id="entrega">
  <div class="container">
    <div class="section-label">Entrega Completa</div>
    <h2>Três pilares que transformam<br>sua <span style="color: var(--teal)">operação</span></h2>
    <p class="section-desc">
      Cada componente foi desenhado para trabalhar em conjunto — da primeira
      mensagem do paciente até a confirmação da consulta no grupo interno.
    </p>

    <!-- AGENTE 1: ATENDIMENTO -->
    <div class="card" style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div class="agent-avatar" style="background: rgba(20, 184, 166, 0.12); border: 1px solid rgba(20, 184, 166, 0.2);">🤖</div>
        <div>
          <h3 style="margin-bottom: 2px;">Sofia — I.A de Atendimento</h3>
          <span style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--teal);">Recepcionista Virtual 24/7</span>
        </div>
      </div>
      <p>A Sofia é treinada com todas as informações da sua clínica — procedimentos, valores, horários, localização. Ela recepciona cada paciente de forma humanizada, qualifica a necessidade e agenda diretamente na sua agenda.</p>
      <ul class="feature-list">
        <li><strong>R.A.G Inteligente</strong> — Cérebro treinado com documentação do seu negócio, regras de atendimento e protocolo de recepção</li>
        <li><strong>Integração com Calendário</strong> — Acessa sua agenda em tempo real e oferece horários disponíveis automaticamente</li>
        <li><strong>Interpretação de Áudios</strong> — Entende mensagens de voz e responde de forma contextual</li>
        <li><strong>Qualificação de Leads</strong> — Identifica o procedimento desejado e urgência do paciente</li>
        <li><strong>Atendimento Humanizado</strong> — Respostas naturais, empáticas e personalizadas</li>
      </ul>
    </div>

    <!-- AGENTE 2: FOLLOW-UP -->
    <div class="card" style="margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div class="agent-avatar" style="background: rgba(139, 92, 246, 0.12); border: 1px solid rgba(139, 92, 246, 0.2);">📋</div>
        <div>
          <h3 style="margin-bottom: 2px;">Helena — I.A de Follow-up</h3>
          <span style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B5CF6;">Gestora de Cadência Inteligente</span>
        </div>
      </div>
      <p>A Helena garante que nenhum lead esfrie. Ela gerencia cadências de reengajamento para quem parou de responder, envia confirmações 24h antes da consulta e faz o repasse dos dados ao grupo interno.</p>
      <ul class="feature-list">
        <li><strong>Follow-up Pré-agendamento</strong> — Cadência inteligente de 1, 3, 5, 15 e 30 dias para leads que pararam de responder</li>
        <li><strong>Confirmação 24h</strong> — Mensagem automática confirmando a consulta com o paciente</li>
        <li><strong>Repasse Automático</strong> — Dados do paciente enviados ao grupo interno do WhatsApp após confirmação</li>
        <li><strong>Detecção de Inatividade</strong> — Identifica leads frios e aplica a cadência correta</li>
        <li><strong>Reengajamento Inteligente</strong> — Mensagens personalizadas baseadas no último contato</li>
      </ul>
    </div>

    <!-- MICROSISTEMA -->
    <div class="card">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <div class="agent-avatar" style="background: rgba(6, 182, 212, 0.12); border: 1px solid rgba(6, 182, 212, 0.2);">📊</div>
        <div>
          <h3 style="margin-bottom: 2px;">Microsistema de Agendamento</h3>
          <span style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--cyan);">Painel de Controle Completo</span>
        </div>
      </div>
      <p>Seu painel centralizado com todas as métricas de atendimento, agenda inteligente com dados dos pacientes e visão completa dos seus agentes de I.A.</p>
      <ul class="feature-list">
        <li><strong>Dashboard de Métricas</strong> — Leads atendidos, agendamentos, taxa de conversão, follow-ups ativos</li>
        <li><strong>Agenda Inteligente</strong> — Calendário visual com todos os pacientes e seus dados ao clicar</li>
        <li><strong>Aba de Agentes</strong> — Visualize performance e status de cada I.A em tempo real</li>
        <li><strong>Leads sem Resposta</strong> — Lista completa de quem parou de responder e em qual cadência está</li>
        <li><strong>Funil de Conversão</strong> — Visualização clara de leads → atendidos → agendados → confirmados</li>
      </ul>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ==================== PREVIEW DO SISTEMA ==================== -->
<div class="section" id="preview">
  <div class="container">
    <div class="section-label">Preview do Sistema</div>
    <h2>Veja seu sistema<br><span style="color: var(--teal)">em funcionamento</span></h2>
    <p class="section-desc">
      Uma prévia real do microsistema que será entregue — com dashboard,
      agenda inteligente e painel de agentes.
    </p>

    <!-- PREVIEW: Dashboard -->
    <div class="mockup-container" style="margin-bottom: 32px;">
      <div class="mockup-topbar">
        <span class="mockup-dot red"></span>
        <span class="mockup-dot yellow"></span>
        <span class="mockup-dot green"></span>
        <span style="flex:1; text-align: center; font-size: 12px; color: var(--white-40);">Dashboard — Painel de Métricas</span>
      </div>
      <div class="mockup-body">
        <div class="mockup-sidebar">
          <div class="mockup-nav">
            <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--white-10);"><img src="/salesland-logo.svg" alt="Salesland" class="salesland-logo-sm" /></div>
            <div class="mockup-nav-item active">📊 Dashboard</div>
            <div class="mockup-nav-item">📅 Agenda</div>
            <div class="mockup-nav-item">🤖 Agentes IA</div>
          </div>
          <div class="mockup-content">
            <div class="kpi-grid">
              <div class="kpi-box"><div class="value">112</div><div class="label">Leads Atendidos</div></div>
              <div class="kpi-box"><div class="value">67</div><div class="label">Agendamentos</div></div>
              <div class="kpi-box"><div class="value">54</div><div class="label">Confirmados</div></div>
              <div class="kpi-box"><div class="value" style="color: var(--green);">43%</div><div class="label">Conversão</div></div>
            </div>
            <table class="table-preview">
              <thead>
                <tr><th>Paciente</th><th>Status</th><th>Procedimento</th><th>Cadência</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Maria Silva</td>
                  <td><span class="status-badge green">Confirmado</span></td>
                  <td>Clareamento</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>João Santos</td>
                  <td><span class="status-badge teal">Agendado</span></td>
                  <td>Implante</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Ana Oliveira</td>
                  <td><span class="status-badge red">Sem Resposta</span></td>
                  <td>Limpeza</td>
                  <td><span class="status-badge amber">3D</span></td>
                </tr>
                <tr>
                  <td>Carlos Pereira</td>
                  <td><span class="status-badge amber">Follow-up</span></td>
                  <td>—</td>
                  <td><span class="status-badge amber">5D</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- PREVIEW: Agenda -->
    <div class="mockup-container" style="margin-bottom: 32px;">
      <div class="mockup-topbar">
        <span class="mockup-dot red"></span>
        <span class="mockup-dot yellow"></span>
        <span class="mockup-dot green"></span>
        <span style="flex:1; text-align: center; font-size: 12px; color: var(--white-40);">Agenda Inteligente — Abril 2026</span>
      </div>
      <div class="mockup-body">
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px;">
          <!-- Calendar mini -->
          <div>
            <div style="text-align: center; font-size: 14px; font-weight: 600; color: var(--white-80); margin-bottom: 16px;">Abril 2026</div>
            <div class="cal-grid">
              <div class="cal-header">D</div>
              <div class="cal-header">S</div>
              <div class="cal-header">T</div>
              <div class="cal-header">Q</div>
              <div class="cal-header">Q</div>
              <div class="cal-header">S</div>
              <div class="cal-header">S</div>
              <div class="cal-day"></div>
              <div class="cal-day"></div>
              <div class="cal-day"></div>
              <div class="cal-day">1</div>
              <div class="cal-day">2</div>
              <div class="cal-day">3</div>
              <div class="cal-day">4</div>
              <div class="cal-day">5</div>
              <div class="cal-day">6</div>
              <div class="cal-day">7</div>
              <div class="cal-day">8</div>
              <div class="cal-day">9</div>
              <div class="cal-day">10</div>
              <div class="cal-day">11</div>
              <div class="cal-day">12</div>
              <div class="cal-day">13</div>
              <div class="cal-day">14</div>
              <div class="cal-day">15</div>
              <div class="cal-day">16</div>
              <div class="cal-day">17</div>
              <div class="cal-day">18</div>
              <div class="cal-day">19</div>
              <div class="cal-day">20</div>
              <div class="cal-day">21</div>
              <div class="cal-day">22</div>
              <div class="cal-day">23</div>
              <div class="cal-day">24</div>
              <div class="cal-day">25</div>
              <div class="cal-day today">26</div>
              <div class="cal-day">27</div>
              <div class="cal-day active has-event">28</div>
              <div class="cal-day has-event">29</div>
              <div class="cal-day has-event">30</div>
            </div>
          </div>
          <!-- Day detail -->
          <div>
            <div style="font-size: 13px; font-weight: 600; color: var(--white-60); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">Terça, 28 de Abril</div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--dark-mid); border: 1px solid var(--white-10); border-radius: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--teal-glow); border: 1px solid rgba(20,184,166,0.2); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--teal); font-size: 14px;">09:00</div>
                <div style="flex:1"><div style="font-size: 14px; font-weight: 600; color: var(--white-90);">Maria Silva</div><div style="font-size: 12px; color: var(--white-40);">Clareamento Dental</div></div>
                <span class="status-badge green">Confirmado</span>
              </div>
              <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--dark-mid); border: 1px solid var(--white-10); border-radius: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--teal-glow); border: 1px solid rgba(20,184,166,0.2); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--teal); font-size: 14px;">10:30</div>
                <div style="flex:1"><div style="font-size: 14px; font-weight: 600; color: var(--white-90);">Fernanda Lima</div><div style="font-size: 12px; color: var(--white-40);">Manutenção Ortodontia</div></div>
                <span class="status-badge green">Confirmado</span>
              </div>
              <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--dark-mid); border: 1px solid var(--white-10); border-radius: 12px;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--teal-glow); border: 1px solid rgba(20,184,166,0.2); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--teal); font-size: 14px;">14:00</div>
                <div style="flex:1"><div style="font-size: 14px; font-weight: 600; color: var(--white-90);">Roberto Costa</div><div style="font-size: 12px; color: var(--white-40);">Avaliação Prótese</div></div>
                <span class="status-badge amber">Pendente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PREVIEW: Agentes -->
    <div class="mockup-container">
      <div class="mockup-topbar">
        <span class="mockup-dot red"></span>
        <span class="mockup-dot yellow"></span>
        <span class="mockup-dot green"></span>
        <span style="flex:1; text-align: center; font-size: 12px; color: var(--white-40);">Agentes IA — Monitoramento</span>
      </div>
      <div class="mockup-body">
        <div class="grid-2">
          <div class="agent-card">
            <div class="agent-header">
              <div class="agent-avatar" style="background: rgba(20, 184, 166, 0.12); border: 1px solid rgba(20, 184, 166, 0.2);">🤖</div>
              <div>
                <div class="agent-name">Sofia</div>
                <div class="agent-type">Atendimento</div>
              </div>
            </div>
            <div class="agent-status">Ativa — 2 min atrás</div>
            <div class="grid-3" style="margin-top: 12px;">
              <div class="kpi-box"><div class="value" style="font-size: 20px;">847</div><div class="label">Atendimentos</div></div>
              <div class="kpi-box"><div class="value" style="font-size: 20px; color: var(--green);">94.2%</div><div class="label">Sucesso</div></div>
              <div class="kpi-box"><div class="value" style="font-size: 20px;">1.2m</div><div class="label">Tempo Resp.</div></div>
            </div>
            <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 4px;">
              <span class="tag">R.A.G</span>
              <span class="tag">Agendamento</span>
              <span class="tag">Áudio</span>
              <span class="tag">WhatsApp</span>
            </div>
          </div>
          <div class="agent-card">
            <div class="agent-header">
              <div class="agent-avatar" style="background: rgba(139, 92, 246, 0.12); border: 1px solid rgba(139, 92, 246, 0.2);">📋</div>
              <div>
                <div class="agent-name">Helena</div>
                <div class="agent-type" style="color: #8B5CF6;">Follow-up</div>
              </div>
            </div>
            <div class="agent-status">Ativa — 15 min atrás</div>
            <div class="grid-3" style="margin-top: 12px;">
              <div class="kpi-box"><div class="value" style="font-size: 20px;">423</div><div class="label">Mensagens</div></div>
              <div class="kpi-box"><div class="value" style="font-size: 20px; color: var(--green);">87.5%</div><div class="label">Sucesso</div></div>
              <div class="kpi-box"><div class="value" style="font-size: 20px;">21</div><div class="label">Em Cadência</div></div>
            </div>
            <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 4px;">
              <span class="tag">1D-30D</span>
              <span class="tag">Confirmação 24h</span>
              <span class="tag">Repasse</span>
              <span class="tag">Reengajamento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ==================== FLUXO ==================== -->
<div class="section">
  <div class="container">
    <div class="section-label">Como Funciona</div>
    <h2>Do primeiro contato à<br><span style="color: var(--teal)">consulta confirmada</span></h2>
    <p class="section-desc">
      Fluxo completo e automatizado — sem falhas, sem esquecimentos.
    </p>

    <div class="flow-container">
      <div class="flow-step">
        <h4>1. Paciente entra em contato pelo WhatsApp</h4>
        <p>Texto ou áudio — a Sofia entende ambos e responde em segundos, 24 horas por dia.</p>
      </div>
      <div class="flow-step">
        <h4>2. Sofia qualifica e apresenta opções</h4>
        <p>Identifica o procedimento, responde dúvidas usando o cérebro R.A.G e oferece horários disponíveis.</p>
      </div>
      <div class="flow-step">
        <h4>3. Paciente escolhe horário e agenda</h4>
        <p>Os dados vão automaticamente para o microsistema de agendamento e aparecem na sua agenda.</p>
      </div>
      <div class="flow-step">
        <h4>4. Helena confirma 24h antes</h4>
        <p>Mensagem automática de confirmação. Se não responder, entra na cadência de follow-up.</p>
      </div>
      <div class="flow-step">
        <h4>5. Dados repassados ao grupo interno</h4>
        <p>Consulta confirmada → nome, procedimento, horário e observações enviados ao grupo do WhatsApp da clínica.</p>
      </div>
      <div class="flow-step">
        <h4>6. Lead parou de responder? Helena reengaja.</h4>
        <p>Cadência de 1D, 3D, 5D, 15D e 30D com mensagens personalizadas para resgatar o interesse.</p>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ==================== INVESTIMENTO ==================== -->
<div class="section" id="investimento">
  <div class="container">
    <div class="section-label">Investimento</div>
    <h2>Valor que se paga<br><span style="color: var(--teal)">no primeiro mês</span></h2>
    <p class="section-desc">
      Considere: uma recepcionista CLT custa em média R$3.500/mês + encargos.
      Nossas I.As trabalham 24/7 sem férias, sem faltas, sem erros.
    </p>

    <div class="grid-2">
      <!-- Valor separado -->
      <div class="pricing-card">
        <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--white-40); margin-bottom: 24px;">Valores Individuais</div>
        <div class="pricing-item">
          <span class="name">🤖 I.A de Atendimento (Sofia)</span>
          <span class="price crossed">R$ 3.000</span>
        </div>
        <div class="pricing-item">
          <span class="name">📋 I.A de Follow-up (Helena)</span>
          <span class="price crossed">R$ 1.500</span>
        </div>
        <div class="pricing-item">
          <span class="name">📊 Microsistema de Agendamento</span>
          <span class="price crossed">R$ 2.000</span>
        </div>
        <div class="pricing-total" style="border-top: 1px solid var(--white-10);">
          <span class="label">Total Individual</span>
          <span class="value" style="color: var(--white-40); font-size: 28px; text-decoration: line-through;">R$ 6.500</span>
        </div>
      </div>

      <!-- Proposta -->
      <div class="pricing-card featured">
        <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); margin-bottom: 24px;">Proposta Especial</div>
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 13px; color: var(--white-40); margin-bottom: 8px;">Implementação completa por</div>
          <div style="font-family: 'Playfair Display', serif; font-size: 52px; font-weight: 700; color: var(--teal); line-height: 1;">R$ 5.000</div>
          <div style="font-size: 13px; color: var(--teal-dim); margin-top: 8px;">Economia de R$ 1.500</div>
        </div>

        <div class="pricing-recurrence">
          <span class="label">Recorrência mensal</span>
          <span class="value">R$ 1.000<small style="font-size: 12px; color: var(--white-40); font-weight: 400;">/mês</small></span>
        </div>

        <div style="margin-top: 24px; padding: 16px; background: var(--dark-mid); border-radius: 12px; border: 1px solid var(--white-10);">
          <div style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--white-40); margin-bottom: 12px;">Incluso na recorrência</div>
          <ul class="feature-list" style="gap: 8px;">
            <li style="font-size: 13px;">Manutenção e atualizações das I.As</li>
            <li style="font-size: 13px;">Suporte prioritário</li>
            <li style="font-size: 13px;">Infraestrutura e servidores</li>
            <li style="font-size: 13px;">Treinamento contínuo do R.A.G</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Formas de pagamento -->
    <div style="margin-top: 40px;">
      <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--white-40); margin-bottom: 20px; text-align: center;">Formas de Pagamento</div>
      <div class="payment-grid">
        <div class="payment-option">
          <div class="payment-icon">💳</div>
          <div>
            <h4>Cartão de Crédito</h4>
            <p>Em até 4x de R$ 1.250,00</p>
          </div>
        </div>
        <div class="payment-option" style="border-color: var(--teal-dim); background: linear-gradient(135deg, rgba(20,184,166,0.03), var(--dark-card));">
          <div class="payment-icon" style="background: rgba(34,197,94,0.1);">💰</div>
          <div>
            <h4>PIX <span style="color: var(--green); font-size: 12px;">— R$ 200 OFF</span></h4>
            <p>Valor final: R$ 4.800,00 à vista</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ==================== CTA FINAL ==================== -->
<div class="cta-section">
  <div class="container">
    <div class="section-label" style="justify-content: center;">Próximo Passo</div>
    <h2 style="font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 40px); margin-bottom: 16px;">Pronto para nunca mais<br><span style="color: var(--teal)">perder um paciente</span>?</h2>
    <p style="font-size: 16px; color: var(--white-60); max-width: 500px; margin: 0 auto 32px;">
      Clique no botão abaixo para fechar a proposta e iniciarmos
      a implementação da sua clínica inteligente.
    </p>
    <a href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20fechar%20a%20proposta%20do%20sistema%20de%20I.A" class="btn-primary" style="font-size: 16px; padding: 16px 40px;">
      Fechar Proposta no WhatsApp →
    </a>
    <p style="font-size: 12px; color: var(--white-20); margin-top: 20px;">Proposta válida por 7 dias</p>
  </div>
</div>

<!-- ==================== FOOTER ==================== -->
<div class="footer">
  <div class="container">
    <div style="margin-bottom: 16px;"><img src="/salesland-logo.svg" alt="Salesland" class="salesland-logo-lg" /></div>
    <div class="footer-logo">
      <span style="color: var(--teal);">Salesland</span> × Dr. Felipe Fernandes
    </div>
    <p>Proposta exclusiva preparada com inteligência artificial.<br>
    <a href="https://salesland.com.br">salesland.com.br</a></p>
  </div>
</div>
`

export default html
