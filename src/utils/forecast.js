const request = require('request')
const Search = require('../DB/modals/Search')

const f = async (body)=>{
  const s = new Search({
    lat:body.location.lat,
    lon:body.location.lon,
    location:body.location.name,
    reg:body.location.region
  })
  await s.save()
}

const forecast = (lattitude, longitude, callback) => {
    const url ="http://api.weatherstack.com/current?access_key=d0197d0f5d113cf165c34158b74d6daa&query="+lattitude+"," +longitude;

    request({ url: url, json: true }, (error, {body}) => {
      if (error) {
        callback("Can't Connect With Network", undefined);
      } else if (body.error) {
        callback(body.error.type, undefined);
      } else {
         
          f(body)

        callback(undefined,body);
      }
    });
  };

 module.exports= forecast