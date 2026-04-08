import { database } from '../db/database.js';

const statements = {
  listByRange: database.prepare(`
    SELECT id, date, period, memo
    FROM shifts
    WHERE date >= ? AND date < ?
    ORDER BY date ASC, period ASC
  `),
  insert: database.prepare(`
    INSERT INTO shifts (date, period, memo)
    VALUES (?, ?, ?)
  `),
  findById: database.prepare(`
    SELECT id, date, period, memo
    FROM shifts
    WHERE id = ?
  `),
  deleteById: database.prepare(`
    DELETE FROM shifts
    WHERE id = ?
  `),
  countByRange: database.prepare(`
    SELECT COUNT(*) AS totalPeriods
    FROM shifts
    WHERE date >= ? AND date < ?
  `),
};

export function listShiftsByRange(start, end) {
  return statements.listByRange.all(start, end);
}

export function createShift({ date, period, memo }) {
  const result = statements.insert.run(date, period, memo);
  return statements.findById.get(result.lastInsertRowid);
}

export function deleteShiftById(id) {
  return statements.deleteById.run(id);
}

export function countShiftsByRange(start, end) {
  return statements.countByRange.get(start, end).totalPeriods;
}
