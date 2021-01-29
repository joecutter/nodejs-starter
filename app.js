const createError = require("http-errors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("./middleware/index");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./Docs/swaggerConfig");

//DataSource
const database = require("./db/connect");

//Routes
const { AuthRouter } = require("./routes/index");

const config = require(__dirname + "/config." + process.env.NODE_ENV);

const server = async () => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors());

  /**
   * -------------- DATABASE INITIALIZATION ----------------
   */

  await database.connect();

  /**
   * -------------- PASSPORT AUTHENTICATION ----------------
   */

  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * -------------- ROUTES ----------------
   */

  app.use(`${config.APP.VERSION}/auth`, AuthRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  const PORT = `${config.APP.PORT}`;
  app.listen(PORT, () => {
    console.log("🚀 Server ready:");
    console.log("\n\n ******************************** \n\n");
    console.log(`ENVIRONMENT : ${process.env.NODE_ENV}`);
    console.log(`URL : http://${config.APP.HOST}:${PORT}`);
    console.log("\n\n ******************************** \n\n");
  });
};

server();
module.exports = app;
