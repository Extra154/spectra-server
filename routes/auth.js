const express = require("express");
const router = express.Router();
const db = require("../utils/database");

/**
 * SIGN UP
 * Saves username + permanent Agora UID
 */
router.post("/signup", (req, res) => {
  const { username, agora_uid } = req.body;

  if (!username || !agora_uid) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.run(
    "INSERT INTO users (username, agora_uid) VALUES (?, ?)",
    [username, agora_uid],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ error: "Username already exists" });
        }
        return res.status(500).json({ error: err.message });
      }

      res.json({
        userId: this.lastID,
        agora_uid
      });
    }
  );
});

/**
 * LOGIN
 * Fetches Agora UID for calls
 */
router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  db.get(
    "SELECT id, agora_uid FROM users WHERE username = ?",
    [username],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!row) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        userId: row.id,
        agora_uid: row.agora_uid
      });
    }
  );
});

/**
 * UPDATE FCM TOKEN
 * Required for push notifications & calls
 */
router.post("/update-fcm", (req, res) => {
  const { username, fcm_token } = req.body;

  if (!username || !fcm_token) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.run(
    "UPDATE users SET fcm_token = ? WHERE username = ?",
    [fcm_token, username],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ status: "FCM token saved" });
    }
  );
});

module.exports = router;


