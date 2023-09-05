import { type } from "@testing-library/user-event/dist/type";

const weatherOptions = [
  { url: require("../images/day/clear.svg").default, day: true, type: "clear" },
  {
    url: require("../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  { url: require("../images/day/fog.svg").default, day: true, type: "fog" },
  { url: require("../images/day/rain.svg").default, day: true, type: "rain" },
  { url: require("../images/day/snowy.svg").default, day: true, type: "snowy" },
  { url: require("../images/day/storm.svg").default, day: true, type: "storm" },
  {
    url: require("../images/night/clear.svg").default,
    day: false,
    type: "clear",
  },
  {
    url: require("../images/night/cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
  { url: require("../images/night/fog.svg").default, day: false, type: "fog" },
  {
    url: require("../images/night/rain.svg").default,
    day: false,
    type: "rain",
  },
  {
    url: require("../images/night/snowy.svg").default,
    day: false,
    type: "snowy",
  },
  {
    url: require("../images/night/storm.svg").default,
    day: false,
    type: "storm",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });
  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}° F</div>
      <img className="weather__image" src={imageSrcUrl} />
    </section>
  );
};

export default WeatherCard;
