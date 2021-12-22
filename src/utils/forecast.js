const request = require("postman-request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1764cee2aa11e9c2284379f614f9bd35&query=" +
    lattitude +
    "," +
    longitude;

  console.log(url);

  // + '&units=f' - nod needed.

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the Weather Service", undefined);
    } else if (body.error) {
      callback("Unable to find location" + body.error, undefined);
    } else {
      callback(
        undefined,
        `The weather is ${body.current.weather_descriptions} today. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out and the wind speed is ${body.current.wind_speed}.`
      );
    }
  });
};

module.exports = forecast;
