import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };
  return (
    <ModalWithForm
      title="New item"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          placeholder="Name"
          name="name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        Image
        <input
          className="modal__input"
          type="url"
          placeholder="Image URL"
          name="link"
          minLength="1"
          maxLength="3000"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <p className="modal__select-weather">Select the weather type:</p>
      <div className="modal__radio-inputs">
        <div>
          <input
            className="modal__radio-button"
            name="weather"
            type="radio"
            id="weather"
            value="hot"
            onChange={handleWeatherChange}
          />
          <label className="modal__radio-button-label">Hot</label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            name="weather"
            type="radio"
            id="weather"
            value="warm"
            onChange={handleWeatherChange}
          />
          <label className="modal__radio-button-label">Warm</label>
        </div>
        <div>
          <input
            className="modal__radio-button"
            name="weather"
            type="radio"
            id="weather"
            value="cold"
            onChange={handleWeatherChange}
          />
          <label className="modal__radio-button-label">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
