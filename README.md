# Felipe Fernandes — Microsistema de Agenda

Painel de agendamento do consultório do Dr. Felipe Fernandes, integrado à I.A de atendimento rodando no N8N.

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **lucide-react**

## Rotas

| Rota                    | Descrição                                      |
|-------------------------|------------------------------------------------|
| `/`                     | Redireciona para `/sistema`                   |
| `/sistema`              | Redireciona para `/sistema/agenda`            |
| `/sistema/agenda`       | Agenda do dia (slots de 1h)                   |
| `/sistema/dashboard`    | Métricas (placeholder "Em breve")             |
| `/proposta`             | Proposta comercial (página estática)          |

## Desenvolvimento

```bash
npm install
npm run dev
```

Por padrão, o frontend usa um **mock em `localStorage`** (chave `felipe-fernandes:appointments`). Para apontar para o backend real, defina:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.felipefernandes.salesland.com.br
```

## Estrutura

```
app/
├── layout.tsx
├── page.tsx                    → redirect /sistema
├── globals.css
├── proposta/                   (proposta comercial — fora do escopo do sistema)
└── sistema/
    ├── layout.tsx              shell + topbar + sidebar
    ├── page.tsx                redirect /sistema/agenda
    ├── agenda/page.tsx         página principal da agenda
    ├── dashboard/page.tsx      placeholder "Em breve"
    ├── components/
    │   ├── Sidebar.tsx
    │   ├── DateNavigator.tsx
    │   ├── NewAppointmentModal.tsx
    │   ├── PhoneInput.tsx
    │   ├── StatusToggle.tsx
    │   └── ConfirmDialog.tsx
    └── lib/
        ├── api.ts              client tipado (mock + remoto)
        ├── procedures.ts       catálogo de procedimentos
        ├── schedule.ts         utilitários de horário
        ├── storage.ts          wrapper de localStorage
        └── types.ts
```

## Integração com backend

Veja [API_CONTRACT.md](./API_CONTRACT.md) — documenta todos os endpoints REST que o backend precisa expor para o painel e para a I.A do N8N.

## Regras de negócio

- **Slots**: 1 hora, sempre na hora cheia (08:00, 09:00, …).
- **Funcionamento**: seg-sex 8h–19h • sáb 8h–13h • dom fechado.
- **Status**: `agendado` (default) ou `confirmado` (toggle no painel).
- **Conflitos**: o frontend bloqueia, mas o backend deve revalidar.

## Build

```bash
npm run build
npm run start
```

Deploy via Vercel (já configurado em `.vercel/`).
