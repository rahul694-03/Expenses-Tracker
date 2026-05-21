import { useState } from "react";

export default function Signup({ setAuthPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email, password })
    );

    alert("Signup successful!");
    setAuthPage("login");
  };

  return (
    <div className="auth-form">
      <h2>Signup</h2>

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

      <button onClick={handleSignup}>Create Account</button>

      <p onClick={() => setAuthPage("login")}>
        Already have account? Login
      </p>
    </div>
  );
}