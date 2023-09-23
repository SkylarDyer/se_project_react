const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          className="card__image"
          id={`card__image_${item.name}`}
          src={item.imageUrl}
          alt="garment"
          onClick={() => onSelectCard(item)}
        />
      </div>

      <div id={`{card__name}_$(item.name)`} className="card__name"></div>
    </div>
  );
};

export default ItemCard;
