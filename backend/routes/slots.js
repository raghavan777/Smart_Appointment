const express = require("express");
const Slot = require("../models/Slot");
const router = express.Router();

router.get("/", async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});

router.post("/create", async (req, res) => {
  const slot = new Slot(req.body);
  await slot.save();
  res.json({ message: "Slot created" });
});

module.exports = router;
