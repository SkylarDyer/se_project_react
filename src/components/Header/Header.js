import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__left">
          <Link to="/">
            <img src={logo} alt="WTWR Logo" />
          </Link>
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar">
        <div className="header__right">
          <ToggleSwitch />

          <button
            className="header__button"
            onClick={onCreateModal}
            type="text"
          >
            + Add clothes
          </button>
        </div>
        <Link to="/profile">Name</Link>
        <div>
          <img src={avatar} alt="Avatar Logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
