import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingArr, timeOfDay }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || "";

  const getWeatherType = (temp) => {
    if (currentTemperatureUnit === "C") {
      temp = (temp * 9) / 5 + 32;
    }
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType(temp);
  const filteredCards = clothingArr.filter((item) => {
    return item.weather === weatherType;
  });
  return (
    <main className="main">
      <WeatherCard day={timeOfDay} type={weatherType} weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp}° {currentTemperatureUnit}. You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                item={item}
                onSelectCard={onSelectCard}
                key={item?.id || item?._id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
