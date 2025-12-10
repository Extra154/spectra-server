const express = require("express");
const router = express.Router();
const generateRtcToken = require("../utils/generateRtcToken");
const generateRtmToken = require("../utils/generateRtmToken");

// Create RTC token (voice/video)
router.get("/rtc", (req, res) => {
    const { uid, channelName } = req.query;

    if (!uid || !channelName) {
        return res.status(400).json({ error: "Missing uid or channelName" });
    }

    const token = generateRtcToken(uid, channelName);
    res.json({ token });
});

// Create RTM token (messaging/signaling)
router.get("/rtm", (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: "Missing uid" });
    }

    const token = generateRtmToken(uid);
    res.json({ token });
});

module.exports = router;

