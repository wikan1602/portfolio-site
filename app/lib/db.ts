import { Pool } from 'pg';

// Lazy shared pool for reads outside the webhook (e.g. the admin dashboard).
// Same pattern as the webhook: never parse DATABASE_URL at import time, or the
// build fails when the env var is absent.
let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;

  const raw = process.env.DATABASE_URL;
  if (!raw) {
    throw new Error('DATABASE_URL is not set');
  }

  const dbUrl = new URL(raw);
  pool = new Pool({
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || '5432', 10),
    database: dbUrl.pathname.substring(1),
    ssl: false,
  });
  return pool;
}
