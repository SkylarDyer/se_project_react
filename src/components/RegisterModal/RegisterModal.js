import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ onClose, onRegister, toLogin, ...props }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: name,
      avatar: avatar,
      email: email,
      password: password,
    });
  };

  return (
    <ModalWithForm
      submitEvent={handleSubmit}
      onClose={onClose}
      title={"Register today!"}
      name={"Register"}
    >
      <div>
        <label className="form__input-label">
          Name
          <input
            className="form__input form__input-name"
            type="text"
            placeholder="Name"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </label>
        <label className="form__input-label">
          Avatar
          <input
            className="form__input form__input-avatar"
            type="text"
            placeholder="URL"
            required
            onChange={(event) => {
              setAvatar(event.target.value);
            }}
          />
        </label>
        <label className="form__input-label">
          Email
          <input
            className="form__input form__input-email"
            type="email"
            placeholder="Email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label className="form__input-label" type="text">
          Password
          <input
            className={`form__input input__type-password`}
            type="password"
            placeholder="Password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <p className="login__button" onClick={toLogin}>
          Or sign in
        </p>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
