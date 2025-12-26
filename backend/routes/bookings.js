const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

router.post("/create", async (req, res) => {
  try {
    const { userName, slotId } = req.body;

    const slot = await Slot.findById(slotId);

    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    slot.isBooked = true;
    await slot.save();

    const booking = new Booking({
      userName,
      slotId
    });

    await booking.save();

    res.status(201).json({ message: "Booking successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
