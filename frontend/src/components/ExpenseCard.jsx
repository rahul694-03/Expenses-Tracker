function ExpenseCard({ expense, deleteExpense }) {
  if (!expense) return null;

  return (
    <tr className="border-b hover:bg-gray-50 transition-all">
      <td className="px-4 py-2">{expense.title}</td>

      <td className="px-4 py-2 font-semibold text-green-600">
        ₹{expense.amount}
      </td>

      <td className="px-4 py-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {expense.category}
        </span>
      </td>

      <td className="px-4 py-2">
        <button
          onClick={() => deleteExpense(expense.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExpenseCard;