import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({
  day,
  type,
  weatherTemp = "",
  currentTemperatureUnit = "",
}) => {
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });
  const weatherOptionUrl = weatherOption.url || "";

  return (
    <section className="weather" id="weather">
      <h2 className="weather__info">
        {weatherTemp}° {currentTemperatureUnit}
      </h2>
      <img className="weather__image" alt="Weather" src={weatherOptionUrl} />
    </section>
  );
};

export default WeatherCard;
