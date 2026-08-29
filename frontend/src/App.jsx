import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

const API_BASE_URL = "https://expenses-tracker-7-0xw4.onrender.com";

export default function App() {

  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [page, setPage] = useState("dashboard");
  const [expenses, setExpenses] = useState([]);

  // Load logged-in user
  useEffect(() => {

    const session = localStorage.getItem("currentUser");

    if (session) {
      setUser(JSON.parse(session));
    }

  }, []);

  // Load expenses
  const loadExpenses = async (email) => {

    if (!email) return;

    try {

      const res = await fetch(
        `${API_BASE_URL}/expenses/${encodeURIComponent(email)}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      setExpenses(data);

    } catch (error) {

      console.error("Error loading expenses:", error);

    }
  };

  // Reload when user changes
  useEffect(() => {

    if (user) {
      loadExpenses(user.email);
    }

  }, [user]);

  // Logout
  const logout = () => {

    localStorage.removeItem("currentUser");

    setUser(null);
    setAuthPage("login");
    setExpenses([]);

  };

  // Login / Signup
  if (!user) {

    return (
      <div className="auth-wrapper">

        <div className="auth-box">

          {authPage === "login" && (
            <Login
              setUser={setUser}
              setAuthPage={setAuthPage}
            />
          )}

          {authPage === "signup" && (
            <Signup
              setAuthPage={setAuthPage}
            />
          )}

          <div style={{ marginTop: "15px" }}>

            <button
              onClick={() => setAuthPage("login")}
            >
              Login
            </button>

            <button
              onClick={() => setAuthPage("signup")}
            >
              Signup
            </button>

          </div>

        </div>

      </div>
    );
  }

  // Main application
  return (

    <div style={{ display: "flex" }}>

      <Sidebar
        page={page}
        setPage={setPage}
      />

      <div style={{ width: "100%" }}>

        <button onClick={logout}>
          Logout
        </button>

        {page === "dashboard" && (
          <Dashboard
            user={user}
            reload={() => loadExpenses(user.email)}
          />
        )}

        {page === "analytics" && (
          <Analytics
            expenses={expenses}
          />
        )}

        {page === "reports" && (
          <Reports
            expenses={expenses}
          />
        )}

      </div>

    </div>
  );
}