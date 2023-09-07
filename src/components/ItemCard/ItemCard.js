const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          className="card__image"
          src={item.link}
          alt="Card Image"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
