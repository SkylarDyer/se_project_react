import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { Switch, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getForecast } from "../../utils/weatherApi";
import {
  getClothingItems,
  deleteClothingItems,
  addClothingItem,
} from "../../utils/Api";
import AddItemModal from "../AddItemModal/AddItemModal";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [clothingArray, setClothingArray] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const dateNow = Date.now() * 0.001;

  /* -------------------------------------------------------------------------- */
  /*                                  HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

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

  const handleCardDelete = (_id) => {
    console.log(_id);
    deleteClothingItems(_id)
      .then((res) => {
        const updatedArray = clothingArray.filter((item) => {
          return item._id !== _id;
        });
        setClothingArray(updatedArray);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItemSubmit = (values) => {
    const newItem = {
      name: values.name,
      weather: values.weather,
      imageUrl: values.link,
    };
    addClothingItem(newItem)
      .then((res) => {
        setClothingArray([res, ...clothingArray]);
        handleCloseModal();
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

  /* -------------------------------------------------------------------------- */
  /*                                 USE EFFECT                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getForecast()
      .then((data) => {
        const weather = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
        };
        const locationName = data.name;
        setLocation(locationName);
        setTemp(weather);
        const sunriseData = data.sys.sunrise;
        setSunrise(sunriseData);
        const sunsetData = data.sys.sunset;
        setSunset(sunsetData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingArray(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        {
          handleCloseModal();
        }
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
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
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header onCreateModal={handleCreateModal} location={location} />
      <Switch>
        <Route exact path="/">
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            timeOfDay={timeOfDay()}
            clothingArr={clothingArray}
          />
        </Route>
        <Route path="/profile">
          <Profile
            onCreateModal={handleCreateModal}
            onSelectCard={handleSelectedCard}
            clothingArr={clothingArray}
          />
        </Route>
      </Switch>
      <Footer />
      {activeModal === "create" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          onAddItem={handleAddItemSubmit}
          isOpen={activeModal === "create"}
          onClose={handleCloseModal}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          onDeleteItem={handleCardDelete}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
