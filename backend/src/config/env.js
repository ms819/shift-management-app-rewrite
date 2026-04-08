import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

function resolveDbPath() {
  if (process.env.DB_PATH) {
    return process.env.DB_PATH;
  }

  if (process.env.NODE_ENV === 'production') {
    return '/var/data/shift.db';
  }

  return path.join(projectRoot, 'data', 'shift.db');
}

function resolveCorsOrigins() {
  const raw = process.env.CORS_ORIGIN ?? 'http://localhost:5173';
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  dbPath: resolveDbPath(),
  corsOrigins: resolveCorsOrigins(),
};
