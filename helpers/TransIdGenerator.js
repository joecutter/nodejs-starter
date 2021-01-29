const Logger = require("./Logger");
const logger = Logger.getLogger("TransIdGenerator");

// Generic method for generating TransactionID
const generateTransID = (length) => {
  let _getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let parts = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";

  for (let i = 0; i < length; ++i) {
    let index = _getRandomInt(0, parts.length - 1);
    id += parts[index];
  }
  logger.info("\n\n====== TRANS ID %s ==========\n\n", id);
  return id;
};

module.exports = {
  generateTransID,
};
