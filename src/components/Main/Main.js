import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingArr, timeOfDay }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || "";

  const getWeatherType = () => {
    const temp = weatherTemp?.temperature?.F;
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
      <WeatherCard day={timeOfDay} type="rain" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        <h2 className="card__section-title">
          Today is {temp}° {currentTemperatureUnit}. You may want to wear:
        </h2>
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
