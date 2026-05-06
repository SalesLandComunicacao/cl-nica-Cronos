# API Contract — Clínica Cronos / Microsistema de Agenda

Documento de referência para o backend (Node/N8N/edge function) que servirá o frontend deste projeto. O frontend já está pronto e consome os endpoints abaixo via `fetch` — basta apontar a env `NEXT_PUBLIC_API_URL` para a URL pública da API.

---

## Convenções gerais

- **Base URL**: definida pela env `NEXT_PUBLIC_API_URL` (ex: `https://api.clinicacronos.salesland.com.br`).
- **Content-Type**: `application/json` em todas as requisições com body.
- **Charset**: UTF-8.
- **Fuso horário**: `America/Fortaleza` (UTC-3). Datas devem ser tratadas como locais.
- **Autenticação**: header `x-api-key: {KEY}` (a KEY será compartilhada via canal seguro). Recomendado também aceitar `Authorization: Bearer {token}` para evolução futura.
- **Erros**: corpo JSON `{ "error": "mensagem legível", "code": "STRING_OPCIONAL" }`.
- **CORS**: liberar a origem do painel (`https://<dominio-frontend>`) e a origem do N8N.

---

## Modelo de dados

### `Appointment`

```ts
type AppointmentStatus = 'agendado' | 'confirmado'

type Appointment = {
  id: string                  // uuid v4
  patientName: string         // nome completo, trim, mínimo 2 chars
  patientPhone: string        // formato livre, mas frontend envia "(85) 99999-9999"
  date: string                // 'YYYY-MM-DD' (dia local)
  time: string                // 'HH:00' (slot inicial, sempre minutos = 00)
  procedureId: string         // ver tabela "Procedimentos"
  status: AppointmentStatus
  createdAt: string           // ISO 8601
  updatedAt: string           // ISO 8601
}
```

### Procedimentos (catálogo fixo, validar `procedureId` contra esta lista)

| `procedureId`        | Categoria          | Label exibido         |
|----------------------|--------------------|-----------------------|
| `implante`           | Foco               | Implante              |
| `protese`            | Foco               | Prótese               |
| `facetas-resina`     | Estético dentário  | Facetas em resina     |
| `clareamento`        | Estético dentário  | Clareamento           |
| `lentes-porcelana`   | Estético dentário  | Lentes de porcelana   |
| `botox`              | Estético facial    | Botox                 |
| `preenchimento`      | Estético facial    | Preenchimento         |
| `canal`              | Clínico            | Canal                 |
| `extracao`           | Clínico            | Extração              |
| `restauracao`        | Clínico            | Restauração           |
| `coroa`              | Clínico            | Coroa                 |
| `bloco`              | Clínico            | Bloco                 |
| `reconstrucao`       | Clínico            | Reconstrução          |

### Horário de funcionamento (regra de negócio)

| Dia          | Abertura | Fechamento | Slots de 1h |
|--------------|----------|------------|-------------|
| Domingo      | —        | —          | Fechado     |
| Seg–Sex      | 08:00    | 19:00      | 11 slots (08, 09, ..., 18) |
| Sábado       | 08:00    | 13:00      | 5 slots (08, 09, 10, 11, 12) |

O backend **deve** rejeitar criações fora desses slots ou em domingo (`409` ou `422`).

---

## Endpoints

### `GET /appointments?date=YYYY-MM-DD`

Lista agendamentos. Sem `date`, retorna todos.

**Resposta 200**:
```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "patientName": "Maria Silva",
    "patientPhone": "(85) 99999-1234",
    "date": "2026-05-08",
    "time": "09:00",
    "procedureId": "implante",
    "status": "agendado",
    "createdAt": "2026-05-06T18:30:00.000Z",
    "updatedAt": "2026-05-06T18:30:00.000Z"
  }
]
```

---

### `POST /appointments`

Cria um agendamento.

**Body**:
```json
{
  "patientName": "Maria Silva",
  "patientPhone": "(85) 99999-1234",
  "date": "2026-05-08",
  "time": "09:00",
  "procedureId": "implante",
  "status": "agendado"
}
```

- `status` é opcional (default `agendado`).
- Validar:
  - `patientName` >= 2 chars
  - `patientPhone` com 10 ou 11 dígitos numéricos
  - `procedureId` ∈ catálogo
  - `date`/`time` dentro do horário de funcionamento
  - **Conflito**: nenhum outro `Appointment` no mesmo `date` + `time`

**Resposta 201**: `Appointment` completo.
**Resposta 409**: conflito de horário — `{ "error": "Horário já ocupado.", "code": "SLOT_TAKEN" }`.
**Resposta 422**: validação — `{ "error": "...", "code": "VALIDATION" }`.

---

### `PATCH /appointments/:id`

Atualiza campos parciais. Cenário típico: confirmar/desconfirmar.

**Body** (qualquer subconjunto de):
```json
{ "status": "confirmado" }
```

- Se mudar `date`/`time`, revalidar conflito.
- Atualizar `updatedAt` automaticamente.

**Resposta 200**: `Appointment` atualizado.
**Resposta 404**: não encontrado.
**Resposta 409**: conflito.

---

### `DELETE /appointments/:id`

Remove um agendamento.

**Resposta 204**: sem corpo.
**Resposta 404**: não encontrado.

---

### `GET /availability?date=YYYY-MM-DD`

**Endpoint crítico para a I.A do N8N** — retorna a grade do dia com flags de disponibilidade. Use esse endpoint para que a I.A ofereça apenas slots livres.

**Resposta 200**:
```json
{
  "date": "2026-05-08",
  "dayLabel": "Sexta",
  "isClosed": false,
  "slots": [
    { "time": "08:00", "available": true },
    { "time": "09:00", "available": false, "appointmentId": "f47ac10b-58cc-4372-a567-0e02b2c3d479" },
    { "time": "10:00", "available": true }
  ]
}
```

Para domingo: `isClosed: true`, `slots: []`.

---

## Fluxo recomendado para o N8N

1. **Lead chega** → I.A coleta nome, telefone e procedimento desejado.
2. I.A pergunta a data preferida → `GET /availability?date=YYYY-MM-DD`.
3. I.A oferece os slots livres → paciente escolhe.
4. I.A confirma → `POST /appointments`.
5. **D-1 (24h antes)** → workflow do N8N envia mensagem de confirmação no WhatsApp.
6. Paciente responde "confirmo" → N8N → `PATCH /appointments/:id` com `{ "status": "confirmado" }`.

---

## Webhook reverso (sugestão futura — não bloqueante)

Quando o painel da clínica muda algo manualmente (ex: cancela uma consulta), seria útil notificar o N8N para que a I.A não tente confirmar uma consulta cancelada. Sugestão:

```
POST {N8N_WEBHOOK_URL}
{
  "event": "appointment.deleted" | "appointment.updated",
  "appointment": Appointment
}
```

Não é necessário no MVP — o frontend só consome a API.

---

## Variáveis de ambiente do frontend

```bash
# .env.local (frontend)
NEXT_PUBLIC_API_URL=https://api.clinicacronos.salesland.com.br
```

Sem essa env, o frontend usa um mock em `localStorage` (útil para dev).
