import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* 🌙 DARK MODE STATE */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* APPLY THEME */
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">📅 Smart Appointment</span>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            {role === "admin" ? (
              <>
                <Link to="/admin-dashboard">📊 Dashboard</Link>
                <Link to="/admin">🛠 Manage Slots</Link>
                <Link to="/admin-bookings">📋 All Bookings</Link>
              </>
            ) : (
              <>
                <Link to="/">📅 Book Slot</Link>
                <Link to="/my-bookings">📄 My Bookings</Link>
              </>
            )}

            {/* 🌙 DARK MODE TOGGLE */}
            <button
              className="theme-btn"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Dark Mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            <button className="logout-btn" onClick={logout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>

            {/* 🌙 DARK MODE FOR PUBLIC */}
            <button
              className="theme-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
