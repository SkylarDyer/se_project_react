import { processServerResponse } from "./Api";
import { longitude, latitude, APIkey } from "./constants";

export const getForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};

export const parseLocation = (data) => {
  const location =  data.name;
  return location;
};

// export const parseWeatherType = (data) => {
//   const weatherData = data.weather;
//   const currentWeatherCondition = weatherData[0].main.toLowerCase();
//   return currentWeatherCondition;
// };

export const parseTimeOfDay = (data) => {
  const sunsetTime = data.sys.sunset * 1000;
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime < sunsetTime) {
    return true;
  } else return false;
};

// weather.temperature.F = `${Math.round(data.main.temp)}°F`;
// weather.temperature.C = `${Math.round((data.main.temp - 32) * 5/9)}°C`;
