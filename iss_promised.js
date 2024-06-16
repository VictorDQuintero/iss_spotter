const needle = require("needle");

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function () {
  return needle("get", "https://api.ipify.org/?format=json").then(
    (response) => {
      const body = response.body; //retrieve body value from the response object
      const ip = body.ip; // retrieve the ip from the body object
      return ip;
    }
  );
};

module.exports = { fetchMyIP };
