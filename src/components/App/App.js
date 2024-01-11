import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { Switch, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getForecast } from "../../utils/weatherApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothingItemsContext from "../../contexts/ClothingItemsContext";
import {
  getClothingItems,
  deleteClothingItems,
  addClothingItem,
} from "../../utils/Api";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import auth, { signout, checkToken } from "../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { userApi } from "../../utils/UserApi";
import { clothesApi } from "../../utils/ClothesApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [clothingArray, setClothingArray] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const dateNow = Date.now() * 0.001;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const history = useHistory;

  /* -------------------------------------------------------------------------- */
  /*                                  HANDLERS                                  */
  /* -------------------------------------------------------------------------- */

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardDelete = (_id) => {
    console.log(_id);
    deleteClothingItems(_id)
      .then((res) => {
        const updatedArray = clothingArray.filter((item) => {
          return item._id !== _id;
        });
        setClothingArray(updatedArray);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItemSubmit = (values) => {
    const newItem = {
      name: values.name,
      weather: values.weather,
      imageUrl: values.link,
    };
    addClothingItem(newItem)
      .then((res) => {
        setClothingArray([res, ...clothingArray]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleToken = (token) => {
    checkToken(token)
      .then((res) => {
        setUser(res.response);
        handleCloseModal();
        setToken(token);
      })
      .catch((error) => {
        console.error("Invalid token:", error);
      });
  };

  const handleSignIn = ({ email, password }) => {
    auth
      .signin(email, password)
      .then((res) => {
        console.log(res);
        if (res && res.token) {
          localStorage.setItem("token", res.token);
          handleToken(res.token);
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error("Incorect email or password", error);
      });
  };

  function handleRegistration({ name, avatar, email, password }) {
    auth
      .signup(name, avatar, email, password)
      .then((res) => {
        console.log(res);
        handleSignIn({ email, password });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSignOut = () => {
    signout();
    setUser(null);
  };

  const handleEditProfile = (name, avatar) => {
    const token = localStorage.getItem("token");
    userApi
      .updateUser(name, avatar, token)
      .then((res) => {
        handleToken(token);
        setOpenEditProfileModal("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddLikeItem = (card) => {
    const { _id: id, isLiked } = card;
    const token = localStorage.getItem("token");
    if (isLiked) {
      clothesApi.dislikeItem(id, token).then((card) => {
        setClothingArray((cards) => {
          cards.map((c) => (c._id === id ? card.data : c));
        }).catch((error) => {
          console.error(error);
        });
      });
    } else {
      clothesApi
        .likeItem(id, token)
        .then((card) => {
          setClothingArray((cards) => {
            cards.map((c) => (c._id === id ? card.data : c));
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                 USE EFFECT                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getForecast()
      .then((data) => {
        const weather = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
        };
        const locationName = data.name;
        setLocation(locationName);
        setTemp(weather);
        const sunriseData = data.sys.sunrise;
        setSunrise(sunriseData);
        const sunsetData = data.sys.sunset;
        setSunset(sunsetData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingArray(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    console.log(currentToken);
    if (currentToken) {
      handleToken(currentToken);
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        {
          handleCloseModal();
        }
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleClickClose = (evt) => {
      if (
        evt.target.classList.contains("item_modal") ||
        evt.target.classList.contains("modal")
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, [activeModal]);

  return (
    <ClothingItemsContext.Provider value={{ clothingArray }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={user}>
          <section className="Header">
            <Header
              path="/"
              onCreateModal={handleCreateModal}
              location={location}
              // onSignOut={handleSignOut}
              onLogin={() => {
                setActiveModal("login");
              }}
              onRegister={() => {
                setActiveModal("register");
              }}
            />
          </section>
          <Switch>
            <ProtectedRoute auth={!!user} path="/profile">
              <Profile
                onCreateModal={handleCreateModal}
                onSelectCard={handleSelectedCard}
                clothingArr={clothingArray}
                setUser={setUser}
                openEditProfileModal={() => {
                  setActiveModal("edit");
                }}
                onEditProfile={handleEditProfile}
                onSignOut={handleSignOut}
              />
            </ProtectedRoute>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                timeOfDay={timeOfDay()}
                clothingArr={clothingArray}
                onLikeItem={handleAddLikeItem}
              />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              onAddItem={handleAddItemSubmit}
              isOpen={activeModal === "create"}
              onClose={handleCloseModal}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteItem={handleCardDelete}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={openLoginModal}
              onClose={handleCloseModal}
              onLogin={handleSignIn}
              toRegister={() => {
                setActiveModal("register");
              }}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              onClose={handleCloseModal}
              onRegister={handleRegistration}
              toLogin={() => {
                setActiveModal("login");
              }}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              isOpen={openEditProfileModal}
              onClose={handleCloseModal}
              onUpdateUser={handleEditProfile}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </ClothingItemsContext.Provider>
  );
}

export default App;
