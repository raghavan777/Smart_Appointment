import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/app.css";

export default function SlotList() {
  const [slots, setSlots] = useState([]);
  const [lastBooking, setLastBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch slots
  useEffect(() => {
    API.get("/slots")
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Backend not reachable", err);
        setLoading(false);
      });
  }, []);

  // Book slot
  const bookSlot = async (slotId) => {
    try {
      const res = await API.post("/bookings/create", {
        userName: "Test User",
        slotId
      });

      // Mark slot as booked (do NOT remove)
      setSlots(prevSlots =>
        prevSlots.map(slot =>
          slot._id === slotId ? { ...slot, isBooked: true } : slot
        )
      );

      // Save confirmation
      setLastBooking({
        userName: "Test User",
        slotId
      });

      alert("✅ Appointment booked successfully");

    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("⚠️ This slot is already booked");
      } else {
        alert("❌ Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="title">📅 Available Appointment Slots</h2>

      {loading && <p className="loading">Loading slots...</p>}

      {/* Confirmation Card */}
      {lastBooking && (
        <div className="confirmation-card">
          <h3>✅ Appointment Confirmed</h3>
          <p><strong>User:</strong> {lastBooking.userName}</p>
          <p><strong>Slot ID:</strong> {lastBooking.slotId}</p>
        </div>
      )}

      {/* Slots Grid */}
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
