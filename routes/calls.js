const express = require("express");
const router = express.Router();
const { sendIncomingCall } = require("../services/fcmService");

/**
 * Caller starts a call
 */
router.post("/start", async (req, res) => {
  const { callerUsername, calleeUsername, callType, channel } = req.body;

  if (!callerUsername || !calleeUsername || !callType || !channel) {
    return res.status(400).json({ error: "Missing call details" });
  }

  try {
    // Send FCM notification to callee
    await sendIncomingCall(calleeUsername, callerUsername, channel);

    res.json({
      status: "call_sent",
      callee: calleeUsername,
      channel
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send call notification" });
  }
});

/**
 * Receiver accepts the call
 */
router.post("/accept", (req, res) => {
  const { channel } = req.body;

  if (!channel) {
    return res.status(400).json({ error: "Missing channel" });
  }

  res.json({
    status: "call_accepted",
    channel
  });
});

/**
 * Receiver declines the call
 */
router.post("/decline", (req, res) => {
  res.json({ status: "call_declined" });
});

/**
 * Call timeout / missed
 */
router.post("/timeout", (req, res) => {
  res.json({ status: "missed_call" });
});

module.exports = router;
