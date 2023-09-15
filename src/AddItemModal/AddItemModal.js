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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
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
          maxLength="30"
          value={link}
          onChange={handleUrlChange}
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
  );
};

export default AddItemModal;
