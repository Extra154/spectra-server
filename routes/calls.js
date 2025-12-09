const express = require("express");
const axios = require("axios");
const router = express.Router();

// Caller starts a call
router.post("/start", async (req, res) => {
  const { callerId, receiverId, callType, channelName } = req.body;

  if (!callerId || !receiverId || !callType || !channelName) {
    return res.status(400).json({ error: "Missing call details" });
  }

  // Trigger incoming call notification
  await axios.post("https://YOUR_SERVER_URL/push/incoming", {
    to: receiverId,
    data: {
      type: "incoming_call",
      callerId,
      callType,
      channelName
    }
  });

  res.json({ status: "call_sent" });
});

// Receiver accepts the call
router.post("/accept", (req, res) => {
  const { callerId, channelName } = req.body;

  res.json({ status: "call_accepted", channelName });
});

// Receiver declines the call
router.post("/decline", (req, res) => {
  const { callerId } = req.body;

  res.json({ status: "call_declined" });
});

// Call missed (no answer)
router.post("/timeout", (req, res) => {
  const { callerId, receiverId } = req.body;

  res.json({ status: "missed_call" });
});

module.exports = router;