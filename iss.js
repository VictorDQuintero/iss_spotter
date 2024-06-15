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
  needle.get("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const ip = body.ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`https://ipwho.is/${ip}`, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (!response.body.success) {
      const msg = `Success status: ${response.body.success} when fetching coordinates. Server message: ${response.body.message}`;
      callback(Error(msg), null);
      return;
    } else {
      const coordinates = {
        latitude: response.body.latitude,
        longitude: response.body.longitude,
      };

      callback(null, coordinates);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  needle.get(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      //if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        callback(null, body.response);
      }
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
