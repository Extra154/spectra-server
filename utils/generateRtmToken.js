const { RtmTokenBuilder, RtmRole } = require("agora-access-token");
require("dotenv").config();

module.exports = function (uid) {
  return RtmTokenBuilder.buildToken(
    process.env.AGORA_APP_ID,
    process.env.AGORA_APP_CERT,
    uid,
    RtmRole.Rtm_User,
    Math.floor(Date.now() / 1000) + 3600 // 1 hour
  );
};