import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather, link });
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
          required
        />
      </label>
      <label className="modal__label">
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
          required
        />
      </label>
      <p className="modal__select-weather">Select the weather type:</p>
      <div className="modal__radio-inputs">
        <div>
          <label className="modal__radio-button-label">
            <input
              className="modal__radio-button"
              name="radio-button"
              type="radio"
              id="hot"
              value="hot"
              onChange={handleWeatherChange}
            />
            Hot
          </label>
        </div>
        <div>
          <label className="modal__radio-button-label">
            <input
              className="modal__radio-button"
              name="radio-button"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleWeatherChange}
            />
            Warm
          </label>
        </div>
        <div>
          <label className="modal__radio-button-label">
            <input
              className="modal__radio-button"
              name="radio-button"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleWeatherChange}
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
