import React from "react";
import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../Clothes/ClothesSection";
// import "./ClothesSection.css";
const Profile = ({ onCreateModal, onSelectCard, clothingArr }) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>

      <ClothesSection
        // className="clothing"
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingArr={clothingArr}
      />
    </section>
  );
};

export default Profile;
