# Architettura iniziale

## Scelta dei tool

Payload è l'unico modello per collection, campi, validazione, permessi e CRUD generato. PostgreSQL è il database e Next.js ospita pannello e API nella stessa applicazione. Nx e pnpm organizzano il workspace e impediscono import non autorizzati tra futuri pacchetti.

Refine è utile se una futura schermata richiederà un'interfaccia operativa su misura. Il suo Inferencer genera codice durante lo sviluppo e non è previsto come UI di produzione. ZenStack introdurrebbe un secondo modello dati e un secondo livello di permessi sopra Payload. Better Auth introdurrebbe una seconda identità; sarà rivalutato solo se il requisito MFA/passkey non sarà soddisfatto dalla strategia di autenticazione scelta per l'apertura produttiva.

## Confini

- `apps/web` compone il prodotto, senza ospitare logica dei futuri moduli aziendali.
- Ogni futuro modulo risiede in `packages/<nome>` ed espone un solo ingresso pubblico. Tag Nx `type:feature`.
- I pacchetti comuni non importano moduli; tag Nx `type:platform`.
- Un modulo non importa un altro modulo: comunica tramite contratti espliciti e, quando serve, eventi o servizi applicativi.
- Il database e i permessi Payload restano la fonte di verità; l'interfaccia mostra i permessi ma non li decide.

## Stato della fondazione

Il progetto contiene solo l'identità tecnica. `AZZURRA_ACCESS_MODE=closed` limita il pannello agli amministratori. Non ci sono moduli aziendali, file caricabili, push o servizi realtime. Prima dell'accesso produttivo serviranno migrazioni versionate, verifica della revoca delle sessioni, MFA, audit e protezione del deployment.
