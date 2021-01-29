const bcrypt = require("bcrypt");
const { Logger, ApiRes } = require("../helpers");
const logger = Logger.getLogger("UserScript");
const { UserRepo } = require("../query");
const { jwtMiddleware } = require("../middleware");
const config = require(__dirname + "./../config." + process.env.NODE_ENV);

const registerUser = async (body) => {
  logger.info("\n\n ======== Register User ======== \n\n");

  try {
    let response;

    //check if phoneNumber exists
    const existingPhoneNumber = await UserRepo.findByPhoneNumberAndEmail(
      body.phoneNumber,
      body.email
    );
    if (existingPhoneNumber) {
      logger.error("User already exist");
      response = await ApiRes.setResponseMessage(
        301,
        false,
        "MSG_RECORD_EXIST"
      );
      return false;
    }

    body["password"] = await hashPassword(body.password);
    await UserRepo.create(body);

    return ApiRes.setResponseMessage(200, true, "MSG_RECORD_SAVED");
  } catch (error) {
    logger.error(error);
  }
};

const loginUser = ({ customerId, phoneNumber }) => {
  logger.info("\n\n ======== Login User ======== \n\n");
  return jwtMiddleware.jsonwtSign(customerId, phoneNumber);
};

const hashPassword = (password) => {
  logger.info("\n\n ======== Hash Password ======== \n\n");
  return bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(`${config.SECURITY.BCRYPT_SALT_ROUND}`)
  );
};

const validatePassword = (storedPassword, currentPassword) => {
  logger.info("\n\n ======== Validate Password ======== \n\n");
  return bcrypt.compareSync(currentPassword, storedPassword);
};

const resetPassword = () => {
  logger.info("\n\n ======== Reset Password ======== \n\n");
};

module.exports = { registerUser, loginUser, validatePassword, resetPassword };
