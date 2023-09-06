import "./Header.css";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/logo.svg").default} alt="WTWR Logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button onClick={onCreateModal} type="text">
            Add New Clothes
          </button>
        </div>
        <div>Name</div>
        <div>
          <img
            src={require("../../images/avatar.svg").default}
            alt="Avatar Logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
