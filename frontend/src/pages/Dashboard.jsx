import { useEffect, useState } from "react";
import ExpenseChart from "../components/ExpenseChart";

const API_BASE_URL = "https://expenses-tracker-7-0xw4.onrender.com";
function Dashboard({ user, reload }) {

  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // LOAD EXPENSES
  const loadExpenses = async () => {

    if (!user?.email) return;

    try {

      const res = await fetch(
        `${API_BASE_URL}/expenses/${encodeURIComponent(user.email)}`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      setExpenses(data);

    } catch (error) {

      console.error(
        "Error loading expenses:",
        error
      );

    }
  };

  useEffect(() => {

    loadExpenses();

  }, [user]);

  // ADD EXPENSE
  const addExpense = async () => {

    if (!title || !amount || !category) {

      alert("Please fill all fields");

      return;
    }

    try {

      const res = await fetch(
        `${API_BASE_URL}/expenses`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            title: title,
            amount: Number(amount),
            category: category,
            email: user.email
          })
        }
      );

      if (!res.ok) {

        throw new Error(
          `Failed to add expense: ${res.status}`
        );

      }

      setTitle("");
      setAmount("");
      setCategory("");

      await loadExpenses();

      if (reload) {
        await reload();
      }

    } catch (error) {

      console.error(
        "Error adding expense:",
        error
      );

      alert("Failed to add expense");

    }
  };

  // DELETE EXPENSE
  const deleteExpense = async (id) => {

    try {

      const res = await fetch(
        `${API_BASE_URL}/expenses/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!res.ok) {

        throw new Error(
          `Failed to delete: ${res.status}`
        );

      }

      await loadExpenses();

      if (reload) {
        await reload();
      }

    } catch (error) {

      console.error(
        "Error deleting expense:",
        error
      );

    }
  };

  const total = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const average =
    expenses.length > 0
      ? total / expenses.length
      : 0;

  return (

    <div>

      <h1 className="page-title">
        💰 Dashboard
      </h1>

      <div className="cards">

        <div className="card">
          Total ₹{total.toFixed(2)}
        </div>

        <div className="card">
          Transactions {expenses.length}
        </div>

        <div className="card">
          Avg ₹{average.toFixed(2)}
        </div>

      </div>

      <div className="form">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <button onClick={addExpense}>
          ➕ Add Expense
        </button>

      </div>

      <ExpenseChart
        expenses={expenses}
      />

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

          {expenses.map((expense) => (

            <tr key={expense.id}>

              <td>
                {expense.title}
              </td>

              <td>
                ₹{expense.amount}
              </td>

              <td>
                {expense.category}
              </td>

              <td>

                <button
                  className="delete"
                  onClick={() =>
                    deleteExpense(expense.id)
                  }
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