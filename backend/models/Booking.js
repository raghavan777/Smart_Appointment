const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userName: String,
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
