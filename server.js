const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

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

/**
 * NEW: Endpoint to generate Agora voice tokens
 * POST /token/agora
 * Body: { "channelName": "channel_xyz", "uid": 1234 }
 */
app.post("/token/agora", (req, res) => {
    const { channelName, uid } = req.body;

    if (!channelName) {
        return res.status(400).json({ error: "channelName is required" });
    }

    const appId = process.env.AGORA_APP_ID; // set in your .env
    const appCertificate = process.env.AGORA_APP_CERTIFICATE; // set in your .env

    // Role: Publisher for caller/receiver
    const role = RtcRole.PUBLISHER;

    // Token expires in 1 hour
    const expireTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTs = currentTimestamp + expireTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid || 0,
        role,
        privilegeExpireTs
    );

    res.json({ token });
});

// Start server (only once!)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

