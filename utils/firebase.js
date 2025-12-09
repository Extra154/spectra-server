const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json"); // adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;