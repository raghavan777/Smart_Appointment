const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");

// ✅ CREATE SLOT (ADMIN)
router.post("/create", async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const slot = new Slot({
      date,
      time,
      isBooked: false
    });

    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET ALL SLOTS (USER)
// ✅ GET ONLY AVAILABLE SLOTS (USER)
router.get("/", async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: false });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
