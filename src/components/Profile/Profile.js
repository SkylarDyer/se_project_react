import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../Clothes/ClothesSection";
const Profile = ({ onCreateModal, onSelectCard, clothingArr }) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>

      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingArr={clothingArr}
      />
    </section>
  );
};

export default Profile;
