import React from "react";
import "./Sidebar.css";
import avatar from "../../images/avatar.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="profile__image" src={avatar} alt="avatar"></img>
      <div className="profile__name">Skylar Dyer</div>
    </div>
  );
};

export default Sidebar;
