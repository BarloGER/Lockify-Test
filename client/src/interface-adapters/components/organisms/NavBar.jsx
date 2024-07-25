import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataVaultContext } from "../../context/DataVaultContext";
import "./assets/nav-bar.css";

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { isDataVaultUnlocked } = useContext(DataVaultContext);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar__container">
        <div className="nav-bar__brand">
          <h3>Lockify</h3>
        </div>
        <div className="nav-bar__links">
          <button
            onClick={() => changeLanguage("en-EN")}
            className={`${
              i18n.language === "en-EN"
                ? "nav-bar__button--active"
                : "nav-bar__button"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("de-DE")}
            className={`${
              i18n.language === "de-DE"
                ? "nav-bar__button--active"
                : "nav-bar__button"
            }`}
          >
            DE
          </button>
          <NavLink to="/" className="nav-bar__link">
            {t("navBar.home")}
          </NavLink>
          <NavLink to="/user-profile" className="nav-bar__link">
            {t("navBar.userProfile")}
          </NavLink>
          {isDataVaultUnlocked ? (
            <NavLink to="/data-vault/dashboard" className="nav-bar__link">
              {t("navBar.dashboard")}
            </NavLink>
          ) : (
            <NavLink to="/data-vault" className="nav-bar__link">
              {t("navBar.dataVault")}
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
