const admin = require("firebase-admin");

async function sendIncomingCall(username, caller, channel) {
  const message = {
    topic: calls_${username},
    data: {
      type: "incoming_call",
      caller,
      channel
    }
  };

  return admin.messaging().send(message);
}

module.exports = { sendIncomingCall };
