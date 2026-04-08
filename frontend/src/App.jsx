import ShiftForm from './components/ShiftForm.jsx';
import ShiftTable from './components/ShiftTable.jsx';
import PayrollPanel from './components/PayrollPanel.jsx';
import { useShiftManagement } from './hooks/useShiftManagement.js';
import { ymNow } from './utils/ym.js';

const initialMonth = ymNow();

export default function App() {
  const {
    month,
    setMonth,
    items,
    payroll,
    loading,
    error,
    refresh,
    createShiftItem,
    deleteShiftItem,
  } = useShiftManagement(initialMonth);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>シフト管理アプリ</h1>
          <p className="muted">月ごとのシフトと給与をまとめて確認できます。</p>
        </div>

        <div className="header-actions">
          <label className="field compact-field">
            <span>表示月</span>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              disabled={loading}
            />
          </label>
          <button type="button" onClick={() => refresh(month)} disabled={loading}>
            更新
          </button>
        </div>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}

      <section className="grid">
        <PayrollPanel payroll={payroll} />
        <ShiftForm month={month} onCreate={createShiftItem} disabled={loading} />
      </section>

      <ShiftTable items={items} onDelete={deleteShiftItem} loading={loading} />
    </div>
  );
}
