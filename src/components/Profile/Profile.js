import React from "react";
import avatar from "../../images/avatar.svg";
import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
// import clothes

const Profile = ({ onCreateModal }) => {
  return (
    <div className="profile">
      <div className="profile__heading">
        <div className="profile__heading_user">
          <img src={avatar} alt="logo" className="profile__avatar-image" />
          <div className="profile__name">Skylar Dyer</div>
        </div>
        <div className="profile__heading_clothes">
          <div className="profile__title">Your Items</div>
          <div className="profile__add_new">
            <button
              type="text"
              className="profile__add_button"
              onClick={onCreateModal}
            >
              + Add New
            </button>
          </div>
        </div>
      </div>
      <div className="profile__content">
        <Sidebar />
        <Clothes
          className="clothing"
          onSelectCard={onSelectCard}
          clothingArr={clothingArr}
        />
      </div>
    </div>
  );
};

export default Profile;
