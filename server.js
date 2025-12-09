const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tokenRoutes = require("./routes/tokens");
const callRoutes = require("./routes/calls");
const pushRoutes = require("./routes/push");

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/token", tokenRoutes);
app.use("/call", callRoutes);
app.use("/push", pushRoutes);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Spectra Server Running");
});
app.listen(PORT, () => console.log("Server running on port " + PORT));