import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../../components/ModalWithForm/ModalWithForm.css";

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
      title={"Sign Up"}
      name={"Register"}
    >
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          placeholder="Email"
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      <label className="modal__label" type="text">
        Password*
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          placeholder="Name"
          required
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>
      <label className="modal__label">
        Avatar*
        <input
          className="modal__input"
          type="text"
          placeholder="URL"
          required
          onChange={(event) => {
            setAvatar(event.target.value);
          }}
        />
      </label>
      <p className="login__button" onClick={toLogin}>
        Or Log In
      </p>
    </ModalWithForm>
  );
};
export default RegisterModal;
