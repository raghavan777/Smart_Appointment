const API = "http://localhost:5000/api";

// ADMIN
async function createSlot() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  await fetch(`${API}/slots/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time })
  });

  alert("Slot Created");
}

async function loadBookings() {
  const res = await fetch(`${API}/bookings/all`);
  const bookings = await res.json();

  const div = document.getElementById("bookings");
  div.innerHTML = "";

  bookings.forEach(b => {
    div.innerHTML += `
      <p>
        👤 ${b.userName} | 📅 ${b.slotId.date} | ⏰ ${b.slotId.time}
      </p>
    `;
  });
}

loadBookings();
