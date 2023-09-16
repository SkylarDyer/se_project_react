import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { Switch, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getForecast,
  parseWeatherData,
  parseLocation,
  parseTimeOfDay,
} from "../../utils/weatherApi";
import {
  getClothingItems,
  deleteClothingItems,
  addClothingItem,
} from "../../utils/Api";
import AddItemModal from "../../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  // const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [isDay, setDayOrNight] = useState("true");
  const [location, setLocation] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardDelete = (values) => {
    deleteClothingItems(values.id)
      .then((data) => {
        const deleteId = values.id;
        const updatedArray = clothingArray.filter((item) => {
          return item.id !== idToDelete;
        });
        setClothingArray(updatedArray);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItemSubmit = (values) => {
    addClothingItem(values.name, values.url, values.weather)
      .then((data) => {
        const newClothing = [data, ...clothingArray];

        handleCloseModal();
        setClothingArray(newClothing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getForecast()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const isDaytime = parseTimeOfDay(data);
        const city = parseLocation(data);

        setLocation(city);
        setTemp(temperature);
        setDayOrNight(isDaytime);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        const clothingArray = data;
        setClothingArray(clothingArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "escape") {
        {
          handleCloseModal();
        }
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    const handleClickClose = (evt) => {
      if (
        evt.target.classList.contains("item_modal") ||
        evt.target.classList.contains("modal")
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, []);

  console.log(currentTemperatureUnit);
  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} city={location} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              dayOrNight={isDay}
              clothingArr={clothingArr}
            />
          </Route>
          <Route path="/profile">
            <Profile
              clothingArr={clothingArr}
              onCreateModal={handleCreateModal}
              onSelectCard={handleSelectedCard}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDeleteCard={handleCardDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
