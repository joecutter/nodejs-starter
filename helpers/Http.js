const axios = require("axios");
const Logger = require("./Logger");
const logger = Logger.getLogger("HttpService");

module.exports = {
  sendHttpRequest: async (url, payload, authHeaders) => {
    logger.debug("\n\nHttp request.....%s\n\n", url);
    try {
      const textRes = await axios.post(url, payload, authHeaders);
      logger.info(textRes.data);
      return textRes.data;
    } catch (error) {
      logger.error(error);
    }
  },
};
