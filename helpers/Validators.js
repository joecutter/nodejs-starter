const logger = require("./Logger").getLogger("Validators");
const ApiRes = require("./ApiRes");

const checkQueryParam = async (param) => {
  if (!param) {
    logger.error("Missing a value");
    const msg = await ApiRes.setResponseMessage(
      400,
      false,
      "VALIDATION_FIELD_MISSING"
    );
    return msg;
  }
  return true;
};

const validateKraPin = async (param) => {
  if (!param) {
    logger.error("Missing a value");
    const msg = await ApiRes.setResponseMessage(
      400,
      false,
      "VALIDATION_FIELD_MISSING"
    );
    return msg;
  }
  return true;
};

const validateNationalId = async (param) => {
  if (!param) {
    logger.error("Missing a value");
    const msg = await ApiRes.setResponseMessage(
      400,
      false,
      "VALIDATION_FIELD_MISSING"
    );
    return msg;
  }
  return true;
};

module.exports = {
  checkQueryParam,
  validateKraPin,
  validateNationalId,
};
