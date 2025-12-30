import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      setSuccess("✅ Registration successful! Redirecting to login...");
      setForm({ name: "", email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "User already exists or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleRegister}>
        <h2>📝 Create Account</h2>
        <p className="subtitle">Register to book appointments easily</p>

        {error && <div className="error">❌ {error}</div>}
        {success && <div className="success">🎉 {success}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="switch-auth">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
