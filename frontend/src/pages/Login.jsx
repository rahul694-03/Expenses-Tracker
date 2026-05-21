import { useState } from "react";

export default function Login({ setUser, setAuthPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const saved = JSON.parse(localStorage.getItem("currentUser"));

    if (!saved) {
      alert("No account found");
      return;
    }

    if (saved.email === email && saved.password === password) {
      setUser(saved);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p onClick={() => setAuthPage("signup")}>
        New user? Signup
      </p>
    </div>
  );
}