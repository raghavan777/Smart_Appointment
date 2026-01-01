import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Register() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      setSuccess("✅ Registration successful. Please login.");
    } catch {
      setError("❌ User already exists or server error");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass">
        <div className="auth-header">
          <h1>📝 Create Account</h1>
          <p>Register to book appointments easily</p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        {/* Role Selector */}
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

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="strength">
            {password.length < 6 && "Weak"}
            {password.length >= 6 && password.length < 10 && "Medium"}
            {password.length >= 10 && "Strong"}
          </div>

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
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
