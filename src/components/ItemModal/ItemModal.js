import { useContext } from "react";
import "../ItemModal/ItemModal.css";
import { deleteClothingItems } from "../../utils/Api";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ name, selectedCard, onClose }) => {
  const user = useContext(CurrentUserContext);

  const isCardOwner = () => {
    if (user === null) {
      return false;
    } else if (user !== null) {
      if (selectedCard.owner === user.id) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <div className={`modal modal__type${name}`}>
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
          <p className="modal__weather-type">
            Weather type: {selectedCard.weather}
          </p>
          {isCardOwner() ? (
            <button
              className="modal__delete-button"
              onClick={deleteClothingItems}
            >
              Delete Item
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
