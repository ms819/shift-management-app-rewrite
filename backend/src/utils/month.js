import { AppError } from './errors.js';

export function validateMonth(month) {
  if (!/^\d{4}-\d{2}$/.test(month || '')) {
    throw new AppError('month must be in YYYY-MM format', 400);
  }
}

export function monthToRange(month) {
  validateMonth(month);

  const start = `${month}-01`;
  const startDate = new Date(`${start}T00:00:00.000Z`);
  const endDate = new Date(startDate);
  endDate.setUTCMonth(endDate.getUTCMonth() + 1);
  const end = endDate.toISOString().slice(0, 10);

  return { start, end };
}
