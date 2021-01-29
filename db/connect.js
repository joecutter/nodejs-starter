const { Sequelize } = require("sequelize");
const { Logger } = require("../helpers");
const logger = Logger.getLogger("DatabaseConnection");
const config = require(__dirname + "./../config." + process.env.NODE_ENV);

const sequelize = new Sequelize(
  config.DB.BD_NAME,
  config.DB.USER,
  config.DB.PASSWORD,
  {
    host: config.DB.DB_HOST,
    dialect: "mysql",
    pool: {
      max: config.DB.POOL.MAX,
      min: config.DB.POOL.MIN,
      acquire: config.DB.POOL.ACQUIRE,
      idle: config.DB.POOL.IDLE,
    },
  },
  {
    logging: (msg) => logger.debug(msg),
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate({ force: true });
    logger.debug(
      "\n\n🔥🔥 Database Connection established successfully.🔥🔥\n\n"
    );
    await sequelize.sync();
    logger.debug(
      "\n\n👻👻 All models were synchronized successfully.👻👻 \n\n"
    );
  } catch (error) {
    logger.error(
      "\n\n💩💩 Unable to connect to the database💩💩 \n\n %j",
      error
    );
  }
};

const disconnect = async () => {
  try {
    await sequelize.close();
    logger.debug("Connection has been closed successfully.");
  } catch (error) {
    logger.error("Unable to close the database's connection:", error);
  }
};

module.exports = {
  sequelize,
  connect,
  disconnect,
};
