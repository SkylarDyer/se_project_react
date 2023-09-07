import "../ItemModal/ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button-white"
        ></button>
        <img
          src={selectedCard.link}
          alt="Add Item"
          className="modal__image-preview"
        />
        <div className="modal__item-name">{selectedCard.name}</div>
        <div className="modal__weather-type">
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
