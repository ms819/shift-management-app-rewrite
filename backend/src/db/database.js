import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { env } from '../config/env.js';

const schemaPath = path.resolve(process.cwd(), 'schema.sql');

function ensureDirectoryForFile(filePath) {
  const directory = path.dirname(filePath);

  if (directory.startsWith('/var/data')) {
    return;
  }

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

ensureDirectoryForFile(env.dbPath);

const database = new Database(env.dbPath);
database.pragma('journal_mode = WAL');
database.pragma('foreign_keys = ON');

database.exec(fs.readFileSync(schemaPath, 'utf8'));

export { database };