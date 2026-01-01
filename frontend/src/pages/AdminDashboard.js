import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/admin-dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    booked: 0,
    available: 0,
  });

  // 🔐 ADMIN GUARD
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/login";
    }
  }, []);

  // 📊 FETCH DASHBOARD STATS
  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => alert("Failed to load dashboard stats"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="admin-dashboard">
        <h2 className="dashboard-title">📊 Admin Dashboard</h2>
        <p className="dashboard-subtitle">
          Overview of appointment slot status
        </p>

        {/* STAT CARDS */}
        <div className="dashboard-grid">
          <div className="stat-card blue">
            <span className="icon">📅</span>
            <h3>Total Slots</h3>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card green">
            <span className="icon">✅</span>
            <h3>Available</h3>
            <p>{stats.available}</p>
          </div>

          <div className="stat-card red">
            <span className="icon">⛔</span>
            <h3>Booked</h3>
            <p>{stats.booked}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="dashboard-actions">
          <Link to="/admin" className="action-btn primary">
            ⚙️ Manage Slots
          </Link>

          <Link to="/admin-bookings" className="action-btn secondary">
            📋 All Bookings
          </Link>
        </div>
      </div>
    </>
  );
}
