# Azzurra

Fondazione tecnica per la futura suite CRM/ERP di Azzurra. Non contiene moduli o logica aziendale.

## Stack

- Next.js + Payload: pannello amministrativo, API e tipi generati dalle collection.
- PostgreSQL: database relazionale; Neon è il provider cloud previsto.
- pnpm workspace + Nx: task, cache e confini tra futuri moduli.

## Avvio

1. Installare Node.js 24 e pnpm 11.
2. Eseguire `pnpm install` nella radice.
3. Copiare `apps/web/.env.example` in `apps/web/.env` e impostare una connessione PostgreSQL di sviluppo e un segreto casuale.
4. Per creare il primo amministratore, impostare `BOOTSTRAP_ADMIN_EMAIL` e `BOOTSTRAP_ADMIN_PASSWORD` (almeno 16 caratteri) solo nell'ambiente locale e avviare `pnpm --filter @azzurra/web bootstrap:admin`.
5. Eseguire `pnpm dev` e aprire `http://localhost:3000/admin`.

Non collegare un database di produzione al server di sviluppo. `AZZURRA_ACCESS_MODE=closed` consente l'accesso al pannello solo agli amministratori; non impostare `open` finché permessi, audit e test di revoca non saranno completati. La pubblicazione in produzione richiede migrazioni versionate e protezione del deployment prima del bootstrap iniziale.

Le regole per aggiungere moduli sono in [AGENTS.md](AGENTS.md).
