import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/app.css";

export default function SlotList() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
  API.get("/slots")
    .then(res => setSlots(res.data))
    .catch(err => {
      console.error("Backend not reachable", err);
      setSlots([]);
    });
}, []);


 const bookSlot = async (slotId) => {
  try {
    const res = await API.post("/bookings/create", {
      userName: "Test User",
      slotId
    });

    alert("✅ Appointment booked successfully");
    window.location.reload();
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
      <h2 className="title">Available Appointment Slots</h2>

      {slots.length === 0 && (
        <p className="empty">No slots available right now</p>
      )}

      <div className="slot-grid">
        {slots.map(slot => (
          <div key={slot._id} className="slot-card">
            <div className="slot-date">📅 {slot.date}</div>
            <div className="slot-time">⏰ {slot.time}</div>

            <button
              className="book-btn"
              onClick={() => bookSlot(slot._id)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}