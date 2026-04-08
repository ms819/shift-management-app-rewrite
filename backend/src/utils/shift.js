import { AppError } from './errors.js';

export function normalizeShiftPayload(payload = {}) {
  const date = typeof payload.date === 'string' ? payload.date.trim() : '';
  const memo = typeof payload.memo === 'string' ? payload.memo.trim() : '';
  const period = Number(payload.period);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new AppError('date must be in YYYY-MM-DD format', 400);
  }

  if (!Number.isInteger(period) || period < 1 || period > 4) {
    throw new AppError('period must be an integer from 1 to 4', 400);
  }

  return { date, period, memo };
}
