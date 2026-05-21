import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend,
  ResponsiveContainer
} from "recharts";

function ExpenseChart({ expenses }) {
  const map = {};

  expenses.forEach(e => {
    map[e.category] = (map[e.category] || 0) + Number(e.amount);
  });

  const data = Object.keys(map).map(k => ({
    name: k,
    value: map[k]
  }));

  const COLORS = ["#38bdf8", "#a855f7", "#22c55e", "#f97316"];

  return (
    <div className="chart-grid">

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={80}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ExpenseChart;