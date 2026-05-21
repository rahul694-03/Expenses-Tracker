import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Analytics({ expenses }) {

  const COLORS = ["#38bdf8", "#22c55e", "#f97316", "#a855f7", "#ef4444"];

  const categoryMap = {};

  expenses.forEach((e) => {
    const cat = e.category || "Other";
    categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
  });

  const data = Object.keys(categoryMap).map((k) => ({
    name: k,
    value: categoryMap[k],
  }));

  const total = expenses.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Analytics Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>💰 Total Spend: ₹{total}</div>
        <div>📦 Transactions: {expenses.length}</div>
        <div>📊 Categories: {data.length}</div>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* BAR CHART */}
        <div style={{ width: "50%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div style={{ width: "50%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={100}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}