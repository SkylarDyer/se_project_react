import React, { useContext, useEffect } from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../Clothes/ClothesSection";
import ItemCard from "../ItemCard/ItemCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Profile = ({ ...props }) => {
  const {
    onSelectCard,
    onLikeItem,
    onCreateModal,
    clothingArr,
    setUser,
    openEditProfileModal,
    signOut,
  } = props;
  const history = useHistory;
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      history.push("/");
    }
  }, [history]);

  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar
          onSignOut={signOut}
          openEditProfileModal={openEditProfileModal}
        />
        <div>
          <h4 className="main__title">Your Items:</h4>
          <button className="main__button" onClick={onCreateModal}>
            + Add New
          </button>
        </div>
      </div>

      <ClothesSection
        onLikeItem={onLikeItem}
        onSelectCard={onSelectCard}
        clothingArr={clothingArr}
      />
    </section>
  );
};

export default Profile;
