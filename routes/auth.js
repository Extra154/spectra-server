const express = require("express");
const router = express.Router();
const db = require("../utils/database");

// SIGN UP
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

// LOGIN
router.post("/login", (req, res) => {
  const { username } = req.body;

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


module.exports = router;

