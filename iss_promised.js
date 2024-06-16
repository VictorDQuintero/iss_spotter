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

/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function (ip) {
  return needle("get", `https://ipwho.is/${ip}`).then((response) => {
    const body = response.body; //retrieve body value from the response object
    const coordinates = { latitude: body.latitude, longitude: body.longitude }; // retrieves coordinates from response.body and puts them in an object
    return coordinates;
  });
};

/*
 * Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
 * Input: Body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function (location) {
  return needle(
    "get",
    `https://iss-flyover.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`
  ).then((response) => {
    const body = response.body;
    const passtimes = body.response;
    return passtimes;
  });
};

/*
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });
};

module.exports = { nextISSTimesForMyLocation };
