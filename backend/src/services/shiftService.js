import {
  listShiftsByRange,
  createShift as createShiftRecord,
  deleteShiftById,
} from '../repositories/shiftRepository.js';
import { monthToRange } from '../utils/month.js';
import { AppError } from '../utils/errors.js';
import { normalizeShiftPayload } from '../utils/shift.js';

export function getShifts(month) {
  const { start, end } = monthToRange(month);
  return { items: listShiftsByRange(start, end) };
}

export function createShift(payload) {
  const normalized = normalizeShiftPayload(payload);

  try {
    return createShiftRecord(normalized);
  } catch (error) {
    if (String(error.message).includes('UNIQUE constraint failed')) {
      throw new AppError('duplicate shift (same date & period already exists)', 409);
    }
    throw error;
  }
}

export function removeShift(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new AppError('id must be a positive integer', 400);
  }

  const result = deleteShiftById(numericId);
  if (result.changes === 0) {
    throw new AppError('shift not found', 404);
  }

  return { ok: true };
}
