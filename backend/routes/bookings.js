const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

router.post("/create", async (req, res) => {
  const { userName, slotId } = req.body;

  try {
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const booking = new Booking({
      userName,
      slotId
    });

    await booking.save();

    slot.isBooked = true;
    await slot.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});

module.exports = router;
