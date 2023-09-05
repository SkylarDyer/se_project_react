import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add item",
  title,
  onClose,
  name,
}) => {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose}>
          Close
        </button>
        <h3> {title}</h3>
        <form>{children}</form>
        <button type="submit"> {buttonText}</button>
      </div>
    </div>
  );
};

export default ModalWithForm;
