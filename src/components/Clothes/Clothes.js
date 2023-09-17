import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./Clothes.css";

const Clothes = ({ clothingArr, onSelectCard }) => {
  return (
    <section className="clothing__section">
      <div className="clothing__section_cards">
        {clothingArr.map((item) => {
          <ItemCard item={item} onSelectCard={onSelectCard} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default Clothes;
