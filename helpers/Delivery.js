const nodemailer = require("nodemailer");
const moment = require("moment");
const Logger = require("../helpers/Logger");
const logger = Logger.getLogger("DeliveryService");
const Http = require("./Http");
const config = require(__dirname + "./../config." + process.env.NODE_ENV);

// Generic method for sending Text
const sendTextMessage = async (recipient, message) => {
  const url = `${config.MFS.TEXT_URL}`;
  logger.debug("SENDING SMS TO %s ", url);

  const payload = [{ from: "MFS", text: message, to: recipient }];

  const authHeaders = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      "Api-Key": `${config.MFS.API_Key}`,
      "Client-Id": `${config.MFS.Client_ID}`,
      Password: `${config.MFS.PASSWORD}`,
    },
  };

  await Http.sendHttpRequest(url, JSON.stringify(payload), authHeaders);
};

// Generic method for sending Email
const sendEmailMessage = async (data) => {
  logger.info("\n\n==========Send Email============\n\n");

  try {
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: `${config.EMAIL.username}`,
        pass: `${config.EMAIL.password}`,
      },
    });

    let mailOptions = {
      from: `${config.EMAIL.origin}`,
      to: email,
      subject: subject,
      text: message,
      // html: htmlData,
      attachments: [
        {
          filename: policyNo + ".pdf",
          path: "./public/" + policyNo + ".pdf",
        },
      ],
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    logger.debug("Message sent: %s", info.messageId);
    logger.debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  sendTextMessage,
  sendEmailMessage,
};
