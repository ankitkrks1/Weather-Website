const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url ="http://api.weatherstack.com/current?access_key=d0197d0f5d113cf165c34158b74d6daa&query="+lattitude+"," +longitude;

    request({ url: url, json: true }, (error, {body}) => {
      if (error) {
        callback("Can't Connect With Network", undefined);
      } else if (body.error) {
        callback(body.error.type, undefined);
      } else {
          const data = body.current;
  
        callback(undefined,data.weather_descriptions[0] +
          ". It is currently " +
          data.temperature +
          ". It feels like " +
          data.feelslike);
      }
    });
  };

  module.exports= forecast