import "../ItemModal/ItemModal.css";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const handleCardDelete = () => {
    onDeleteItem(selectedCard._id);
  };
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button-white"
        ></button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image-preview"
        />
        <div className="modal__footer">
          <h3 className="modal__item-name">{selectedCard.name}</h3>
          <div className="modal__weather-type">
            Weather type: {selectedCard.weather}
          </div>
          <button
            type="button"
            className="modal__delete-button"
            onClick={handleCardDelete}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
