const express = require("express");
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { userName, slotId } = req.body;

  const slot = await Slot.findById(slotId);
  if (!slot || slot.isBooked) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  slot.isBooked = true;
  await slot.save();

  const booking = new Booking({ userName, slotId });
  await booking.save();

  res.json({ message: "Appointment confirmed" });
});

router.get("/all", async (req, res) => {
  const bookings = await Booking.find().populate("slotId");
  res.json(bookings);
});

module.exports = router;
