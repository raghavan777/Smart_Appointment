import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function AdminSlots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // ➕ CREATE SLOT STATE
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ✏️ EDIT SLOT STATE
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  // 🔐 ADMIN PROTECTION
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      window.location.href = "/login";
    }
  }, []);

  // 📥 FETCH ALL SLOTS
  const fetchSlots = () => {
    API.get("/slots/all")
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // ➕ CREATE SLOT
  const createSlot = async () => {
    if (!date || !time) return alert("Please fill all fields");

    try {
      await API.post("/slots/create", { date, time });
      setDate("");
      setTime("");
      fetchSlots();
    } catch {
      alert("Failed to create slot");
    }
  };

  // 🔄 TOGGLE BOOKING STATUS
  const toggleStatus = async (slot) => {
    try {
      await API.put(`/slots/reset/${slot._id}`);
      setSlots(prev =>
        prev.map(s =>
          s._id === slot._id ? { ...s, isBooked: !s.isBooked } : s
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  // ✏️ START EDIT
  const startEdit = (slot) => {
    setEditingId(slot._id);
    setEditDate(slot.date);
    setEditTime(slot.time);
  };

  // 💾 SAVE EDIT
  const saveEdit = async (id) => {
    try {
      await API.put(`/slots/${id}`, {
        date: editDate,
        time: editTime
      });

      setSlots(prev =>
        prev.map(s =>
          s._id === id ? { ...s, date: editDate, time: editTime } : s
        )
      );
      setEditingId(null);
    } catch {
      alert("Failed to update slot");
    }
  };

  // ❌ DELETE SLOT
  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this slot permanently?")) return;

    try {
      await API.delete(`/slots/${id}`);
      setSlots(prev => prev.filter(slot => slot._id !== id));
    } catch {
      alert("Failed to delete slot");
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h2>🛠 Admin Slot Management</h2>

        {/* ➕ CREATE SLOT */}
        <div className="create-slot-card">
          <h3>Create New Slot</h3>
          <div className="create-slot-form">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <input
              type="text"
              placeholder="10:00 - 10:30"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <button className="create-btn" onClick={createSlot}>
              Add Slot
            </button>
          </div>
        </div>

        {loading && <p className="loading">Loading slots...</p>}

        {/* 📋 SLOT LIST */}
        <div className="admin-grid">
          {slots.map(slot => (
            <div
              key={slot._id}
              className={`admin-card ${slot.isBooked ? "booked" : ""}`}
            >
              {editingId === slot._id ? (
                <>
                  <input
                    type="date"
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editTime}
                    onChange={e => setEditTime(e.target.value)}
                  />

                  <div className="admin-actions">
                    <button className="reset-btn" onClick={() => saveEdit(slot._id)}>
                      Save
                    </button>
                    <button className="delete-btn" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="date">📅 {slot.date}</p>
                  <p className="time">⏰ {slot.time}</p>

                  <p className="status">
                    Status: <strong>{slot.isBooked ? "Booked" : "Available"}</strong>
                  </p>

                  <div className="admin-actions">
                    <button
                      className="reset-btn"
                      onClick={() => toggleStatus(slot)}
                    >
                      {slot.isBooked ? "Mark Available" : "Mark Booked"}
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => startEdit(slot)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteSlot(slot._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
