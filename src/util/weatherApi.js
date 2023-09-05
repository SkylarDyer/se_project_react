const longitude = 10.99;
const latitude = 44.34;
const APIkey = "a1885fd7a60e43937a91ed214e207d85";

export const getForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};

export const parseWeatherType = (data) => {
  const weatherData = data.weather;
  const currentWeatherCondition = weatherData[0].main.toLowerCase();
  return currentWeatherCondition;
};

export const timeOfDay = (data) => {
  const system = data.sys;
  const sunriseTime = system.sunrise * 1000;
  const sunsetTime = system.sunset * 1000;
  let time = {
    sunrise: sunriseTime,
    sunset: sunsetTime,
  };
  return time;
};
