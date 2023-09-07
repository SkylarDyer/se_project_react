import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecast,
  parseWeatherType,
  parseWeatherData,
} from "../../utils/weatherApi";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  // const [weather, setWeatherType] = useState("");
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

  useEffect(() => {
    getForecast()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        // setWeatherType(parseWeatherType(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New item" onClose={handleCloseModal}>
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              placeholder="Name"
              name="name"
              minLength="1"
              maxLength="30"
            />
            Image
            <input
              className="modal__input"
              type="url"
              placeholder="Image URL"
              name="link"
              minLength="1"
              maxLength="30"
            />
          </label>
          <p className="modal__select-weather">Select the weather type:</p>
          <div className="modal__radio-inputs">
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="hot"
                value="hot"
              />
              <label className="modal__radio-button-label">Hot</label>
            </div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="warm"
                value="warm"
              />
              <label className="modal__radio-button-label">Warm</label>
            </div>
            <div>
              <input
                className="modal__radio-button"
                type="radio"
                id="cold"
                value="cold"
              />
              <label className="modal__radio-button-label">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
