const { UserModel } = require("../models");
const { Logger } = require("../helpers");
const logger = Logger.getLogger("UserRepo");

const create = async ({ dataValues }) => {
  logger.debug("Create new User ", dataValues);
  try {
    return UserModel.create({ ...dataValues });
  } catch (error) {
    logger.error(error);
  }
};

const findAndCountAll = (limit) => {
  try {
    return UserModel.findAndCountAll({ limit });
  } catch (error) {
    logger.error(error);
  }
};

const findByPhoneNumber = (phoneNumber) => {
  try {
    return UserModel.findAndCountAll({
      where: {
        phoneNumber,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const findByPhoneNumberAndEmail = (phoneNumber, email) => {
  try {
    return UserModel.findAndCountAll({
      where: {
        phoneNumber,
        email,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const findByCustomerId = (customerId) => {
  try {
    return UserModel.findAndCountAll({
      where: {
        customerId,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const findAllByStatus = (isActive) => {
  try {
    return UserModel.findAndCountAll({
      where: {
        isActive,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const updateByPhoneNumber = (phoneNumber, body) => {
  try {
    return UserModel.update(body, {
      where: {
        phoneNumber,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  create,
  findAndCountAll,
  findByPhoneNumber,
  findByPhoneNumberAndEmail,
  findByCustomerId,
  findAllByStatus,
  updateByPhoneNumber,
};
