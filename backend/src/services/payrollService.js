import { countShiftsByRange } from '../repositories/shiftRepository.js';
import { monthToRange } from '../utils/month.js';

const WAGE_PER_PERIOD = 1250;

export function getPayroll(month) {
  const { start, end } = monthToRange(month);
  const totalPeriods = countShiftsByRange(start, end);

  return {
    month,
    totalPeriods,
    salary: totalPeriods * WAGE_PER_PERIOD,
  };
}
