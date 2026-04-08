import { useCallback, useEffect, useState } from 'react';
import { createShift, deleteShift, getPayroll, getShifts } from '../api/client.js';

export function useShiftManagement(initialMonth) {
  const [month, setMonth] = useState(initialMonth);
  const [items, setItems] = useState([]);
  const [payroll, setPayroll] = useState({ month: initialMonth, totalPeriods: 0, salary: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async (targetMonth = month) => {
    setLoading(true);
    setError('');

    try {
      const [shiftData, payrollData] = await Promise.all([
        getShifts(targetMonth),
        getPayroll(targetMonth),
      ]);

      setItems(shiftData.items);
      setPayroll(payrollData);
    } catch (err) {
      setError(err.message || 'データ取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    refresh(month);
  }, [month, refresh]);

  const createShiftItem = useCallback(async (payload) => {
    await createShift(payload);
    const payloadMonth = String(payload.date).slice(0, 7);
    if (payloadMonth !== month) {
      setMonth(payloadMonth);
      return;
    }
    await refresh(month);
  }, [month, refresh]);

  const deleteShiftItem = useCallback(async (id) => {
    await deleteShift(id);
    await refresh(month);
  }, [month, refresh]);

  return {
    month,
    setMonth,
    items,
    payroll,
    loading,
    error,
    refresh,
    createShiftItem,
    deleteShiftItem,
  };
}
