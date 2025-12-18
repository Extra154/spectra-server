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
    await sendIncomingCall(calleeUsername, callerUsername, channel, callType);

    res.json({
      status: "call_sent",
      caller: callerUsername,
      callee: calleeUsername,
      callType,
      channel
    });
  } catch (err) {
    console.error("Error sending call notification:", err);
    res.status(500).json({ error: "Failed to send call notification" });
  }
});

/**
 * Receiver accepts the call
 */
router.post("/accept", (req, res) => {
  const { callerUsername, calleeUsername, channel, callType } = req.body;

  if (!callerUsername || !calleeUsername || !channel || !callType) {
    return res.status(400).json({ error: "Missing details for acceptance" });
  }

  console.log(Call accepted: ${callType} call from ${callerUsername} → ${calleeUsername});

  res.json({
    status: "call_accepted",
    caller: callerUsername,
    callee: calleeUsername,
    callType,
    channel
  });
});

/**
 * Receiver declines the call
 */
router.post("/decline", (req, res) => {
  const { callerUsername, calleeUsername, callType } = req.body;

  if (!callerUsername || !calleeUsername || !callType) {
    return res.status(400).json({ error: "Missing details for decline" });
  }

  console.log(Call declined: ${callType} call from ${callerUsername} → ${calleeUsername});
  res.json({ status: "call_declined" });
});

/**
 * Call timeout / missed
 */
router.post("/missed", (req, res) => {
  const { callerUsername, calleeUsername, callType } = req.body;

  if (!callerUsername || !calleeUsername || !callType) {
    return res.status(400).json({ error: "Missing details for missed call" });
  }

  console.log(📞 Missed ${callType} call: ${callerUsername} → ${calleeUsername});

  res.json({ status: "call_missed", caller: callerUsername, callee: calleeUsername, callType });
});

module.exports = router;


