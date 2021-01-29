const { Logger, ApiRes } = require("../helpers");
const logger = Logger.getLogger("AuthController");
const { UserScript } = require("../scripts");

const registerUser = async (res, req, next) => {
  logger.info("\n\n========= REGISTER USER ===========\n\n");

  //Validate User Model

  const savedUser = await UserScript.registerUser(req.body);
  return res.send(savedUser);
};

const loginUser = async (res, req, next) => {
  logger.info("\n\n========= LOGIN USER ===========\n\n");
};

const forgotPwdUser = async (res, req, next) => {
  logger.info("\n\n========= FORGOT PASSWORD ===========\n\n");
};

const loginViaFacebook = async (res, req, next) => {
  logger.info("\n\n========= FORGOT PASSWORD ===========\n\n");

  // Successful authentication, redirect home.
  res.redirect("/");
};

module.exports = {
  registerUser,
  loginUser,
  forgotPwdUser,
  loginViaFacebook,
};
