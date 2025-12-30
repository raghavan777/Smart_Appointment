import { useState } from "react";
import API from "../services/api";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      // Save auth details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/slots";
      }
    } catch (err) {
      setError("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🔐 Welcome Back</h2>
        <p className="subtitle">Login to book your appointment</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
