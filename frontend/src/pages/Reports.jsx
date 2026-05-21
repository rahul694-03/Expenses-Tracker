export default function Reports({ expenses }) {

  const total = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const highest = expenses.length
    ? Math.max(...expenses.map((e) => Number(e.amount)))
    : 0;

  const categoryCount = {};

  expenses.forEach((e) => {
    categoryCount[e.category] =
      (categoryCount[e.category] || 0) + 1;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>📄 Reports</h1>

      {/* SUMMARY */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div>💰 Total: ₹{total}</div>
        <div>🔥 Highest: ₹{highest}</div>
        <div>📦 Transactions: {expenses.length}</div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <h3 style={{ marginTop: "20px" }}>Category Breakdown</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(categoryCount).map((cat) => (
            <tr key={cat}>
              <td>{cat}</td>
              <td>{categoryCount[cat]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EXPENSE LIST */}
      <h3 style={{ marginTop: "20px" }}>All Expenses</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.amount}</td>
              <td>{e.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}