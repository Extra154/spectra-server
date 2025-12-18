const admin = require("firebase-admin");

// This function sends a push notification to a single receiver
async function sendIncomingCall(username, callerUsername, channelName) {
  const message = {
    topic: calls_${username}, // topic named after receiver
    data: {
      type: "incoming_call",   // marks this as a call notification
      callType: "voice",       // specifies it's a voice call
      caller: callerUsername,  // who is calling
      channel: channelName     // Agora channel or any channel identifier
    }
  };

  await admin.messaging().send(message);
}

module.exports = { sendIncomingCall };
