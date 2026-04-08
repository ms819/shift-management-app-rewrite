function formatYen(value) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PayrollPanel({ payroll }) {
  return (
    <section className="card">
      <h2>給与見込み</h2>
      <div className="payroll-grid">
        <div>
          <span className="muted">対象月</span>
          <strong>{payroll.month}</strong>
        </div>
        <div>
          <span className="muted">コマ数</span>
          <strong>{payroll.totalPeriods} コマ</strong>
        </div>
        <div>
          <span className="muted">給与</span>
          <strong>{formatYen(payroll.salary)}</strong>
        </div>
      </div>
    </section>
  );
}
