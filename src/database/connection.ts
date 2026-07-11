import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 10, // máximo de conexões no pool
  idleTimeoutMillis: 30000, // fecha conexões ociosas
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool', err);
});