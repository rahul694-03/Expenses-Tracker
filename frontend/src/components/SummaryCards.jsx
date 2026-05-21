function SummaryCards({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const avg = expenses.length ? (total / expenses.length).toFixed(2) : 0;

  const max = expenses.length
    ? Math.max(...expenses.map(e => Number(e.amount)))
    : 0;

  return (
    <div className="card-container">
      <div className="card">💰 Total: ₹{total}</div>
      <div className="card">📊 Average: ₹{avg}</div>
      <div className="card">🔥 Highest: ₹{max}</div>
    </div>
  );
}

export default SummaryCards;