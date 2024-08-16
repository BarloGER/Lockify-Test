import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoIosLock } from "react-icons/io";

import { DataVaultContext } from "../../context/DataVaultContext";
import "./assets/secondary-navigation-bar.css";

export const SecondaryNavigationBar = () => {
  const { t } = useTranslation();
  const { setMasterPassword, isDataVaultUnlocked, setIsDataVaultUnlocked } =
    useContext(DataVaultContext);

  if (!isDataVaultUnlocked) {
    return;
  }

  return (
    <nav className="secondary-navigation-bar">
      <ul className="secondary-navigation-bar__list">
        <li>
          <NavLink to="/data-vault/accounts">{t("navBar.accounts")}</NavLink>
        </li>
        <li>
          <NavLink to="/data-vault/contacts">{t("navBar.contacts")}</NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/data-vault/notes">{t("navBar.notes")}</NavLink>
        </li>
        <li>
          <NavLink to="/data-vault/banks">{t("navBar.bankInfo")}</NavLink>
        </li>
        <li>
          <button
            className="secondary-navigation-bar__lock-button"
            onClick={() => {
              setMasterPassword(""), setIsDataVaultUnlocked(false);
            }}
          >
            <IoIosLock />
          </button>
        </li>
      </ul>
    </nav>
  );
};
