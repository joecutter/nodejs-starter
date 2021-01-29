const apiMessages = require("./ApiMessages.json");

// Generic successful handler used by all endpoints.
const setResponseMessage = async (code, success, message, data) => {
  if (message && data) {
    message = await getResponseMessage(message);
    return { code, success, message, data };
  }

  if (message) {
    message = await getResponseMessage(message);
    return { code, success, message };
  }

  if (data) {
    return { code, success, data };
  }
};

const getResponseMessage = (message) => {
  return apiMessages[message];
};

module.exports = {
  setResponseMessage,
  getResponseMessage,
};
