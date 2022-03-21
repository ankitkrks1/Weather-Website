const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
require('./DB/db/mongoose')

// To record all the searches
const saveSearch = require('./SearchRecord/LoadSearch');
const forecastTxt = require("./forecastTxt");
const Gps = require('./DB/modals/gps')

const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ankit K Kashyap",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ankit K Kashyap",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "The is weather forcasting web-application. just type your location and get your weather",
    title: "Help",
    name: "Ankit K Kashyap",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Search Can't be Empty",
    });
  }
  saveSearch(req.query.address) // Load all te searches to db
  geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      } else {
        forecast(lattitude, longitude, (error, body) => {
  
          const forecast = forecastTxt(body)
          
          if (error) {
            return res.send({
              error,
            });
          } else {
            res.send({
              forecast,
              location,
              address: req.query.address,
            });
          }
        });
      }
    }
    
  );
});

//gps function :- Track all the gps of user who has used the current location
const gpsDb = async (gpsLink)=>{
  const gps = new Gps({
    gps:gpsLink
  })
  await gps.save()
}

app.get('/w',(req,res)=>{
  const lattitude = req.query.lat
  const longitude = req.query.long
  const googleMapLink = `https://google.com/maps?q=${lattitude},${longitude}`
  gpsDb(googleMapLink)

  forecast(lattitude, longitude, (error, body) => {
  
    const forecast = forecastTxt(body)
    
    if (error) {
      return res.send({
        error,
      });
    } else {
      res.send({
        forecast
      });
    }
  });
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ankit K Kashyap",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ankit K Kashyap",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
