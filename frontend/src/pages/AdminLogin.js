import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
        role: "admin"
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      navigate("/admin/dashboard");
    } catch {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass">
        <div className="auth-header">
          <h1>🛠 Admin Login</h1>
          <p>Manage appointment slots</p>
        </div>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login as Admin</button>
        </form>
      </div>
    </div>
  );
}
