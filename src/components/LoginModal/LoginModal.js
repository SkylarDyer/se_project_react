import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin, toRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState("");

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (isPasswordValid(password)) {
      setValidForm("true");
      onLogin({ email, password });
    }
    setValidForm("false");
  };

  return (
    <ModalWithForm
      onClose={onClose}
      submitEvent={handleSubmit}
      title={"Welcome back!"}
      name={"Log In"}
      className="form__input-title"
    >
      <label className="form__input-label">
        Email
        <input
          className="form__input form__input-email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      <label className="form__input-label" type="text">
        Password
        <input
          className={`form__input input__type-password ${
            isPasswordValid ? "" : "form__input-invalid"
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
