import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

export default function App() {
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [page, setPage] = useState("dashboard");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const session = localStorage.getItem("currentUser");
    if (session) setUser(JSON.parse(session));
  }, []);

  const loadExpenses = async (email) => {
    if (!email) return;

    const res = await fetch(`http://localhost:8080/expenses/${email}`);
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    if (user) loadExpenses(user.email);
  }, [user]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setAuthPage("login");
    setExpenses([]);
  };

  // 🔐 AUTH SCREEN (FIXED SIGNUP VISIBILITY)
  if (!user) {
    return (
      <div className="auth-wrapper">
        
        <div className="auth-box">
          
          {authPage === "login" && (
            <Login setUser={setUser} setAuthPage={setAuthPage} />
          )}

          {authPage === "signup" && (
            <Signup setAuthPage={setAuthPage} />
          )}

          <div style={{ marginTop: "15px" }}>
            <button onClick={() => setAuthPage("login")}>
              Login
            </button>

            <button onClick={() => setAuthPage("signup")}>
              Signup
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 📊 MAIN APP
  return (
    <div style={{ display: "flex" }}>
      <Sidebar page={page} setPage={setPage} />

      <div style={{ width: "100%" }}>
        <button onClick={logout}>Logout</button>

        {page === "dashboard" && (
          <Dashboard
            user={user}
            reload={() => loadExpenses(user.email)}
          />
        )}

        {page === "analytics" && (
          <Analytics expenses={expenses} />
        )}

        {page === "reports" && (
          <Reports expenses={expenses} />
        )}
      </div>
    </div>
  );
}