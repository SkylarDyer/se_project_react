import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import "../../components/ModalWithForm/ModalWithForm.css";

const LoginModal = ({ isOpen, onClose, onLogin, toRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState("");

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid(password)) {
      setValidForm("true");
      onLogin({ email, password });
    }
    setValidForm("false");
  };

  return (
    <ModalWithForm
      onClose={onClose}
      handleSubmit={handleSubmit}
      title={"Log In"}
      name={"Log In"}
      className="modal__title"
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input modal__text-inputs"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      <label className="modal__label" type="text">
        Password
        <input
          className={`modal__input modal__text-inputs${
            isPasswordValid ? "" : "modal__error"
          }`}
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      <p className="register__button" onClick={toRegister}>
        Or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
