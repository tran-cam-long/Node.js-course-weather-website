//const { response } = require("express");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch(
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1IjoidHJhbi1jYW0tbG9uZyIsImEiOiJja2lndTdjcWEwYXAxMnBzODEwM3M2aWdxIn0.7UQqjbjf_eTCR-8VMVq_VA&limit=1"
// ).then((response) => {
//   response.json().then((data) => {
//     const [lat, lon] = data.features[0].center;
//     fetch(
//       `http://api.weatherstack.com/current?access_key=d9b735dcda36f2172286d3d668ed9f5d&query=${lon},${lat}`
//     ).then((response) => {
//       response.json().then((data) => {
//         const { temperature, weather_descriptions, feelslike } = data.current;
//         console.log(temperature, weather_descriptions[0], feelslike);
//       });
//     });
//   });
// });

const weatherForm = document.querySelector("form");

const search = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const address = search.value;
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document
          .querySelector("form")
          .insertAdjacentHTML(
            "afterbegin",
            '<p id="error" style="color:red">Can not find location</p>'
          );
      } else {
        const error = document.querySelector("#error");
        error && (error.innerHTML = "");
        document.querySelector(".result").style.opacity = 100;
        document.querySelector("#result--location").textContent =
          "Location: " + data.location;
        document.querySelector("#result--temp").textContent =
          "Temperature: " + data.temperature;
        document.querySelector("#result--feelslike").textContent =
          "Feels like: " + data.feelslike;
      }
    });
  });
});
