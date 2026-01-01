import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/app.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.delete(`/bookings/cancel/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch {
      alert("Failed to cancel booking");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">📄 My Bookings</h2>

        {bookings.length === 0 && <p>No bookings found.</p>}

        <div className="slot-grid">
          {bookings.map(b => (
            <div key={b._id} className="slot-card booked">
              <div>📅 {b.slot.date}</div>
              <div>⏰ {b.slot.time}</div>

              <button
                className="delete-btn"
                onClick={() => cancelBooking(b._id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
