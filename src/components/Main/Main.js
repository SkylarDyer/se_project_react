import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit];

  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  return (
    <main className="main">
      <WeatherCard day={false} type="rain" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp}° F You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                item={item}
                onSelectCard={onSelectCard}
                key={item._id}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
