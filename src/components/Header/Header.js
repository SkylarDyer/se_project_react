import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { formatDate } from "../../utils/utils";
import {
  Link,
  NavLink,
  // useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({
  onCreateModal,
  location,
  onSignOut,
  onLogin,
  onRegister,
}) => {
  const user = useContext(CurrentUserContext);
  // const history = useHistory();
  // const isProfileLocation = location.pathname === "/profile";
  // const isMainLocation = location.pathname === "/";
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__left">
          <Link to="/">
            <img src={logo} alt="WTWR Logo" />
          </Link>
        </div>
        <h3 className="header__location">{`${formatDate()}, ${location}`}</h3>
      </div>
      <div className="header__avatar">
        <ToggleSwitch />
        {user ? (
          <>
            <button
              className="header__button"
              onClick={onCreateModal}
              type="text"
            >
              + Add clothes
            </button>
            <div>
              <NavLink to="/profile">
                <p className="header__title">{user.name}</p>
              </NavLink>
            </div>
            <div>
              <Link to="/profile">
                <img
                  className="profile__avatar"
                  src={user.avatar}
                  alt="Avatar"
                ></img>
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="signin__button" onClick={onLogin}>
              Log In
            </span>
            <span className="signup__button" onClick={onRegister}>
              Sign up
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
