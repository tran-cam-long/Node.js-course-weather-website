//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d9b735dcda36f2172286d3d668ed9f5d&query=${lon},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.error) {
      callback("Request has failed! Coordinate error!");
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        description: body.current.weather_descriptions[0],
        feelslike: body.current.feelslike,
        humidity: body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
