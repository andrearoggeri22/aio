# Azzurra coding rules

- Do not invent business requirements or add business collections, workflows, or permissions without explicit user requirements.
- Use Payload collection definitions as the source of truth for generated CRUD, validation, API and admin UI. Do not duplicate those layers with another ORM or framework.
- Put each future business module in its own package under `packages/`; expose only its public `index.ts`. The web app composes modules. Shared infrastructure must never import business modules.
- Every client initiated read or write must use Payload access control. Its Local API bypasses access control by default: pass the authenticated user and `overrideAccess: false`.
- Never rely on a hidden button, stale session claims, or client side checks for authorization. Recheck current user state and role server side.
- Keep handwritten source files at or below 300 lines, excluding generated files. Split by responsibility before crossing the limit.
- Keep time authoritative in PostgreSQL UTC; format for Europe/Rome at presentation boundaries.
- Add a migration for every database schema change. Do not run schema push against production.
- Write focused tests for permission changes, revoked sessions, field restrictions, and transaction boundaries.
