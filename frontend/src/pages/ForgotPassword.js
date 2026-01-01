import { useState } from "react";
import API from "../services/api";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError("User not found or server error");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-glass">
        <div className="auth-header">
          <h1>🔑 Forgot Password</h1>
          <p>Enter your registered email to reset password</p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">Reset Password</button>
        </form>

        <div className="auth-footer">
          Remember password? <span onClick={() => window.location.href="/login"}>Login</span>
        </div>
      </div>
    </div>
  );
}
