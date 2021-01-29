const swaggerJsdoc = require("swagger-jsdoc");
const config = require(__dirname + "./../config." + process.env.NODE_ENV);

const definition = {
  info: {
    openapi: "3.0.0",
    title: "INSUREME-BACKEND APPLICATION",
    description: "This is an insurance application",
    contact: { name: "API Support", email: "cjnjenga@gmail.com" },
    version: "1.0.0",
  },
  host: `${config.APP.HOST}:${config.APP.PORT}`,
  schemes: ["http", "https"],
  basePath: `${config.APP.VERSION}`,
  tags: [
    {
      name: "ADMIN",
      description:
        "This should allow admin to manage the `application` and view `metrics`.",
    },
    {
      name: "AUTH",
      description:
        "This should allow users to `authorization` and `authentication`.",
    },
    {
      name: "USSD",
      description:
        "This should show ussd request. If they complete the process then they qualify to be customer lead.",
    },
    {
      name: "CUSTOMER",
      description:
        "This should show customers leads. If they make payments then they qualify to be customers.",
    },
    {
      name: "COVER",
      description: "This should allow users to apply for `cover and query`.",
    },
    {
      name: "PRINCIPLE",
      description: "This should show users with active or inactive policies",
    },
    {
      name: "PAYMENT",
      description: "Track system payments `system payment logs`.",
    },
    {
      name: "WALLET",
      description: "Track customer payments `customer payment logs`.",
    },
    {
      name: "CLAIM",
      description: "This should allows customer to make a `claim`",
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
};

const options = {
  definition,
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
