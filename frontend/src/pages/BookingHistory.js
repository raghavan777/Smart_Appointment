import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/history.css";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/my")
      .then(res => setBookings(res.data));
  }, []);

  return (
    <div className="history-container">
      <h2>📜 My Booking History</h2>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div key={b._id} className="history-card">
          <p>📅 {b.slot.date}</p>
          <p>⏰ {b.slot.time}</p>
          <p>Status: ✅ Booked</p>
        </div>
      ))}
    </div>
  );
}
