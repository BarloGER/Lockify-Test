import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataVaultContext } from "../../context/DataVaultContext";

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { isDataVaultUnlocked } = useContext(DataVaultContext);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <nav>
      <ul>
        <NavLink to="/">{t("navBar.home")}</NavLink>
        <NavLink to="/user-profile">{t("navBar.userProfile")}</NavLink>
        {isDataVaultUnlocked ? (
          <NavLink to="/data-vault/dashboard">{t("navBar.dashboard")}</NavLink>
        ) : (
          <NavLink to="/data-vault">{t("navBar.dataVault")}</NavLink>
        )}
        <button onClick={() => changeLanguage("en-EN")}>EN</button>
        <button onClick={() => changeLanguage("de-DE")}>DE</button>
      </ul>
    </nav>
  );
};
