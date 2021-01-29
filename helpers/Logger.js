const log4js = require("log4js");

// Generic Logger
const getLogger = (moduleName) => {
  const logger = log4js.getLogger(moduleName);
  logger.level = "debug";
  return logger;
};

exports.getLogger = getLogger;
