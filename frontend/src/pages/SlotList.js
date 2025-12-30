import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/app.css";

export default function SlotList() {
  const [slots, setSlots] = useState([]);
  const [lastBooking, setLastBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Login protection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // Fetch slots
  useEffect(() => {
    API.get("/slots")
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const bookSlot = async (slotId) => {
    try {
      await API.post("/bookings/create", {
        userName: "Test User",
        slotId
      });

      setSlots(prev =>
        prev.map(slot =>
          slot._id === slotId ? { ...slot, isBooked: true } : slot
        )
      );

      setLastBooking({ userName: "Test User", slotId });
    } catch {
      alert("Slot already booked");
    }
  };

  return (
    <div className="container">
      <h2 className="title">📅 Available Appointment Slots</h2>

      {loading && <p className="loading">Loading slots...</p>}

      {lastBooking && (
        <div className="confirmation-card">
          <h3>✅ Appointment Confirmed</h3>
          <p><strong>User:</strong> {lastBooking.userName}</p>
          <p><strong>Slot ID:</strong> {lastBooking.slotId}</p>
        </div>
      )}

      <div className="slot-grid">
        {slots.map(slot => (
          <div
            key={slot._id}
            className={`slot-card ${slot.isBooked ? "booked" : ""}`}
          >
            <div className="slot-date">📅 {slot.date}</div>
            <div className="slot-time">⏰ {slot.time}</div>

            {slot.isBooked ? (
              <div className="booked-badge">✔ Booked</div>
            ) : (
              <button
                className="book-btn"
                onClick={() => bookSlot(slot._id)}
              >
                Book Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
