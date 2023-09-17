import React from "react";
import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import Clothes from "../Clothes/Clothes";

const Profile = ({ onCreateModal, onSelectCard, clothingArr }) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <div className="profile__heading">
        <h3 className="profile__title">Your Items</h3>
        <button
          type="text"
          className="profile__add_button"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>

      <Clothes
        className="clothing"
        onSelectCard={onSelectCard}
        clothingArr={clothingArr}
        onCreateModal={onCreateModal}
      />
    </section>
  );
};

export default Profile;
