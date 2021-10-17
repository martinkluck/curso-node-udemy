const dbValidators = require("./db-validators");
const newJwt = require("./new-jwt");
const googleVerify = require("./google-verify");
const uploadFile = require("./upload-file");

module.exports = {
  ...dbValidators,
  ...newJwt,
  ...googleVerify,
  ...uploadFile,
};
