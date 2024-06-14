const needle = require("needle");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  needle.get("https://api.ipify.org/?format=json", (error, response) => {
    if (error) {
      response = null;
      callback(error, response);
    } else {      
      callback(error, response.body.ip);
    }
  });
};

module.exports = { fetchMyIP };
