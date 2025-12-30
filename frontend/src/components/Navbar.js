import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">📅 Smart Appointment</h2>

      <div className="nav-links">
        {token ? (
          <>
            <Link to="/">Slots</Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
