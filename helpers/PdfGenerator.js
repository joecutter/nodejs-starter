const pdf = require("pdf-creator-node");
const fs = require("fs");
const Logger = require("../helpers/Logger");
const logger = Logger.getLogger("PdfGenerator");
const htmlTemplate = fs.readFileSync("./public/index.html", "utf8");

const options = {
  format: "A4",
  orientation: "portrait",
};

const generatePDF = (data) => {
  logger.info("\n\n============= Generate PDF ============ \n\n");

  const document = {
    html: htmlTemplate,
    data: { data },
    path: "./public/" + policyNo + ".pdf",
  };

  // logger.info("Document \n", document.data);

  return pdf
    .create(document, options)
    .then((res) => {
      logger.info("Pdf is generated");
      return res;
    })
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = {
  generatePDF,
};
