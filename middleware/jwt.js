const jwt = require("jsonwebtoken");
const { Logger } = require("../helpers");
const logger = Logger.getLogger("JWTAuthMiddleWare");
const config = require(__dirname + "./../config." + process.env.NODE_ENV);

const secretKey = config.SECURITY.SECRET_KEY;
const expiresIn = config.SECURITY.EXPIRES_IN;

const jsonWebTokenSign = (data) => {
  logger.info("\n\n ======== SIGN JWT TOKEN======== \n\n");
  return jwt.sign(data, secretKey, { expiresIn });
};

module.exports = { jsonWebTokenSign };
