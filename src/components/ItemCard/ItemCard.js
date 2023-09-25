import "./ItemCard.css";
const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card__element">
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />

      <h2 className="card__name">{item.name}</h2>
    </div>
  );
};

export default ItemCard;
