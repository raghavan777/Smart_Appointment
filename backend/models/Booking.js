const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userName: String,
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot"
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
