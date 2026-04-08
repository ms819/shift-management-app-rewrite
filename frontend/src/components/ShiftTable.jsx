export default function ShiftTable({ items, onDelete, loading }) {
  async function handleDelete(id) {
    const ok = window.confirm('このシフトを削除しますか？');
    if (!ok) {
      return;
    }
    await onDelete(id);
  }

  return (
    <section className="card table-card">
      <div className="section-head">
        <h2>登録済みシフト</h2>
        <span className="muted">{loading ? '更新中...' : `${items.length} 件`}</span>
      </div>

      {items.length === 0 ? (
        <p className="muted">この月のシフトはまだありません。</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>コマ</th>
                <th>メモ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.period} 限</td>
                  <td>{item.memo || '-'}</td>
                  <td>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => handleDelete(item.id)}
                      disabled={loading}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
