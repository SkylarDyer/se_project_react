import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
const ClothesSection = ({ clothingArr, onSelectCard }) => {
  return (
    <section className="clothing__section">
      <div className="clothing__section_cards">
        {clothingArr.map((item) => {
          <ItemCard
            item={item}
            onSelectCard={onSelectCard}
            key={item._id}
          />;
        })}
      </div>
    </section>
  );
};

export default ClothesSection;
