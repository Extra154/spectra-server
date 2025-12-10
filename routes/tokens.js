const express = require("express");
const router = express.Router();
const admin = require("../utils/firebase");

// Trigger incoming call push
router.post("/incoming-call", async (req, res) => {
  const { toDeviceToken, callType } = req.body;

  const message = {
    token: toDeviceToken,
    notification: {
      title: "Incoming Call",
      body: You have an incoming ${callType} call,   // <-- FIXED
    },
    data: {
      type: callType,
    },
  };

  try {
    await admin.messaging().send(message);
    res.json({ status: "sent" });
  } catch (error) {
    console.error("Error sending push:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
