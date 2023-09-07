const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <img src={selectedCard.link} alt="Add Item"/>
        <div>{selectedCard.name}</div>
        <div>Weather type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
