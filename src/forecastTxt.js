const forecastTxt = (body)=>{

    console.log(body)
    const data = body.current;
    const txt = 'In '+ body.location.name+ ", "+body.location.region+ ":- " +data.weather_descriptions[0] +
    ". It is currently " +
    data.temperature +
    ". It feels like " +
    data.feelslike+" Wind Direction :"+data.wind_dir+ 
    ", Wind Speed: "+data.wind_speed+"km/h, Humidity: "+data.humidity+" "
    return txt;
}

module.exports = forecastTxt;