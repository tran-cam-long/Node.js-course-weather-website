const request = require("request");
const geocode = require("./geocode.js");
const forecast = require("./weatherCode");
const weatherForecast = require("./weatherCode");
const yargs = require("yargs");
const chalk = require("chalk");

const address = process.argv[2];

// //URL to get HCMC's weather info
// const url =
//   "http://api.weatherstack.com/current?access_key=d9b735dcda36f2172286d3d668ed9f5d&query=10.823099,106.629662&units=f";

// const urlInvalid =
//   "http://api.weatherstack.com/current?access_key=d9b735dcda36f2172286d3d668ed9f5d&query=";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("There is a connectivity error");
//   } else if (response.body.error) {
//     console.log("Input is invalid");
//   } else {
//     const current = response.body.current;

//     const degree = Number(current.temperature);
//     const feelsLike = Number(current.feelslike);

//     console.log(
//       `It is currently ${degree} degrees out. It feels like ${feelsLike} degree out.`
//     );
//   }
// });
geocode(address, (error, { latitude, longitude, location } = {}) => {
  if (error) {
    console.log();
  }
  forecast(
    longitude,
    latitude,
    (error, { temperature, description, feelslike }) => {
      if (error) {
        console.log(error);
      }
      console.log("Forecast Data", temperature);
    }
  );
});
