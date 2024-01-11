import { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, onUpdateUser }) => {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState(`${user.name}`);
  const [avatar, setAvatar] = useState(`${user.avatar}`);
  const isUrlValid = (avatar) => {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(avatar);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    onUpdateUser(name, avatar);
  };

  return (
    <ModalWithForm
      onClose={onClose}
      onSubmit={handleUpdateUser}
      name={"Edit Profile"}
    >
      <div>
        <label className="form__input-label">
          Name
          <input
            className={`form__input form__input-name ${
              name.length < 1 ? "form__input-invalid" : ""
            }`}
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label className="form__input-label">
          Avatar
          <input
            className={`form__input form__input-avatar ${
              !isUrlValid(avatar) ? "form__input-invalid" : ""
            }`}
            type="text"
            placeholder="URL"
            value={avatar}
            required
            onChange={(event) => {
              setAvatar(event.target.value);
            }}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
