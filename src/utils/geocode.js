const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaG9iZXJ0a2siLCJhIjoiY2wwZmFpMG5oMDY2dDNlcDQzeDlsbzVtMiJ9.vnX3xYJY_4UjB-8YVAegLQ&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("can't connent To Network", undefined);
    } else if (body.features.length === 0) {
      callback("Location Not Found, Try Again", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;