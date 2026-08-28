import { useEffect, useState } from "react";
import ExpenseChart from "../components/ExpenseChart";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

function Dashboard({ user, reload }) {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // 🔥 LOAD FROM BACKEND
  const loadExpenses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/expenses/${user.email}`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.log("Error loading expenses", err);
    }
  };

  useEffect(() => {
    if (user) loadExpenses();
  }, [user]);

  // ➕ ADD EXPENSE
  const addExpense = async () => {
    if (!title || !amount || !category) return;

    await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        amount,
        category,
        email: user.email,
      }),
    });

    setTitle("");
    setAmount("");
    setCategory("");

    await loadExpenses();   // update dashboard
    if (reload) reload();   // update analytics/reports
  };

  // ❌ DELETE EXPENSE
  const deleteExpense = async (id) => {
    await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });

    await loadExpenses();   // update dashboard
    if (reload) reload();   // update analytics/reports
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div>
      <h1 className="page-title">💰 Dashboard</h1>

      <div className="cards">
        <div className="card">Total ₹{total}</div>
        <div className="card">Transactions {expenses.length}</div>
        <div className="card">
          Avg ₹{(total / (expenses.length || 1)).toFixed(2)}
        </div>
      </div>

      <div className="form">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addExpense}>➕ Add Expense</button>
      </div>

      <ExpenseChart expenses={expenses} />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>₹{e.amount}</td>
              <td>{e.category}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => deleteExpense(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;