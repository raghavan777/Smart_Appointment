import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    API.get("/slots")
      .then(res => setSlots(res.data));
  }, []);

  return (
    <div className="admin-container">
      <h2>🛠 Admin Dashboard</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {slots.map(slot => (
            <tr key={slot._id}>
              <td>{slot.date}</td>
              <td>{slot.time}</td>
              <td>
                {slot.isBooked ? "Booked" : "Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
