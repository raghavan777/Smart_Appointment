const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/appointmentDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/register"));
app.use("/api/slots", require("./routes/slots"));
app.use("/api/bookings", require("./routes/bookings"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
