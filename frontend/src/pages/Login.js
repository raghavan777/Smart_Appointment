import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
        role
      });

      // ✅ Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ CORRECT REDIRECTION
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");   // ✅ ADMIN DASHBOARD
      } else {
        navigate("/");                  // ✅ USER SLOT PAGE
      }
    } catch {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass">
        <div className="auth-header">
          <h1>🔐 Welcome Back</h1>
          <p>Login to manage your appointments</p>
        </div>

        {error && <div className="alert error">{error}</div>}

        {/* ROLE SELECTOR */}
        <div className="role-switch">
          <label>
            <input
              type="radio"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            <span>👤 User</span>
          </label>

          <label>
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            <span>🛠 Admin</span>
          </label>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
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

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register">
            <span>Register</span>
          </Link>

          <br />

          {/* ✅ FIXED FORGOT PASSWORD */}
          <Link to="/forgot-password" className="forgot">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
