import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedPath = path.join(__dirname, 'data', 'seed-db.json');
const runtimePath = path.join(__dirname, 'data', 'runtime-db.json');

function ensureRuntimeDb() {
  if (!fs.existsSync(runtimePath)) {
    fs.copyFileSync(seedPath, runtimePath);
  }
}

function readDb() {
  ensureRuntimeDb();
  const raw = fs.readFileSync(runtimePath, 'utf-8');
  return JSON.parse(raw);
}

function writeDb(db) {
  fs.writeFileSync(runtimePath, JSON.stringify(db, null, 2), 'utf-8');
}

export function resetDb() {
  fs.copyFileSync(seedPath, runtimePath);
}

export function getUsers() {
  return readDb().users;
}

export function getProducts() {
  return readDb().products;
}

export function getQuotes() {
  return readDb().quotes;
}

export function addQuote(quote) {
  const db = readDb();
  const nextId = db.quotes.length ? Math.max(...db.quotes.map((item) => item.id)) + 1 : 1;
  const newQuote = { id: nextId, ...quote };
  db.quotes.push(newQuote);
  writeDb(db);
  return newQuote;
}
