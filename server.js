const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const tokenRoutes = require("./routes/tokens");
const callRoutes = require("./routes/calls");
const pushRoutes = require("./routes/push");

app.use("/auth", authRoutes);
app.use("/token", tokenRoutes);
app.use("/call", callRoutes);
app.use("/push", pushRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Spectra Server Running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
