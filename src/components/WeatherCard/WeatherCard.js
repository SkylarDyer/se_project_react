import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });

  const weatherOptionUrl = weatherOption?.url || "";
  const weatherOptionType = weatherOption?.type;

  return (
    <section className="weather" id="weather">
      <h2 className="weather__info">
        {weatherTemp}° {currentTemperatureUnit}
      </h2>
      <img
        className="weather__image"
        alt={weatherOptionType}
        src={weatherOptionUrl}
      />
    </section>
  );
};

export default WeatherCard;
