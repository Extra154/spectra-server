const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
require("dotenv").config();

module.exports = function (uid, channelName) {
  return RtcTokenBuilder.buildTokenWithUid(
    process.env.AGORA_APP_ID,
    process.env.AGORA_APP_CERT,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + 3600 // 1 hour
  );
};