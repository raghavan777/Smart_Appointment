import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/admin-bookings.css"; // ✅ FIXED

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/bookings")
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="bookings-container">
        <h2 className="bookings-title">📋 All Bookings</h2>
        <p className="bookings-subtitle">
          Overview of all booked appointment slots
        </p>

        {loading && <p className="loading-text">Loading bookings...</p>}

        <div className="booking-grid">
          {bookings.map((b) => (
            <div className="booking-card" key={b._id}>
              {/* STATUS BADGE */}
              <span className="badge booked">BOOKED</span>

              <p><strong>User:</strong> {b.userName || "Unknown"}</p>
              <p><strong>Email:</strong> {b.userId?.email || "—"}</p>
              <p><strong>Date:</strong> {b.slotId?.date || "—"}</p>
              <p><strong>Time:</strong> {b.slotId?.time || "—"}</p>
              <p>
                <strong>Booked On:</strong>{" "}
                {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
