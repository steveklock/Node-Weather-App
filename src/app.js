const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { allowedNodeEnvironmentFlags } = require("process");
const { request } = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

//creates the app
const app = express();

//path to the public directory
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup the apps static page to the public directory path set above
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Steve",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather",
    name: "Steve",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Steve",
    message: "You need help now!",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { lattitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    // console.log(lattitude, longitude, location);

    forecast(lattitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }

      res.send({
        forcast: forecastData,
        location,
        address: address,
      });
      // console.log(location);
      // console.log(forecastData);
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.name) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.name);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help Article Not Found",
    name: "Steve",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Steve",
  });
});

//start server, callback runs once server is up and running.
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
