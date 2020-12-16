"use strict";
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Con meo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App",
    name: "Con meo",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search criteria",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Con meo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
            error: "Location is not found",
          });
        }
        forecast(
          longitude,
          latitude,
          (error, { temperature, description, feelslike }) => {
            if (error) {
              return console.log(error);
            }
            res.send({
              title: "Weather App",
              location: location,
              temperature: temperature,
              description: description,
              feelslike: feelslike,
              name: "Con meo",
            });
          }
        );
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
