export default function Sidebar({ page, setPage }) {
  return (
    <div className="sidebar">
      <h2>💎Expense Pro </h2>

      <p
        className={page === "dashboard" ? "active" : ""}
        onClick={() => setPage("dashboard")}
      >
        📊 Dashboard
      </p>

      <p
        className={page === "analytics" ? "active" : ""}
        onClick={() => setPage("analytics")}
      >
        📈 Analytics
      </p>

      <p
        className={page === "reports" ? "active" : ""}
        onClick={() => setPage("reports")}
      >
        📄 Reports
      </p>
    </div>
  );
}