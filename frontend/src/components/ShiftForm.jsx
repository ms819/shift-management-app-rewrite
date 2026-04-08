import { useState } from 'react';

const initialState = {
  date: '',
  period: '1',
  memo: '',
};

export default function ShiftForm({ month, onCreate, disabled }) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      setSubmitting(true);
      await onCreate({
        date: form.date,
        period: Number(form.period),
        memo: form.memo,
      });
      setForm((current) => ({ ...current, memo: '' }));
      setMessage('登録しました');
    } catch (error) {
      setMessage(error.message || '登録に失敗しました');
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="card">
      <h2>シフト登録</h2>
      <p className="muted">現在の表示月: {month}</p>
      <form className="stack" onSubmit={handleSubmit}>
        <label className="field">
          <span>日付</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField('date', e.target.value)}
            required
            disabled={disabled || submitting}
          />
        </label>

        <label className="field">
          <span>コマ</span>
          <select
            value={form.period}
            onChange={(e) => updateField('period', e.target.value)}
            disabled={disabled || submitting}
          >
            <option value="1">1限</option>
            <option value="2">2限</option>
            <option value="3">3限</option>
            <option value="4">4限</option>
          </select>
        </label>

        <label className="field">
          <span>メモ</span>
          <input
            type="text"
            value={form.memo}
            onChange={(e) => updateField('memo', e.target.value)}
            placeholder="任意"
            disabled={disabled || submitting}
          />
        </label>

        <button type="submit" disabled={disabled || submitting}>
          {submitting ? '登録中...' : '登録'}
        </button>
      </form>
      {message ? <p className="form-message">{message}</p> : null}
    </section>
  );
}
