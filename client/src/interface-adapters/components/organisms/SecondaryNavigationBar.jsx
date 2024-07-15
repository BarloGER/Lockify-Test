import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { DataVaultContext } from "../../context/DataVaultContext";
import { Button } from "../atoms";
import "./assets/secondary-navigation-bar.css";

export const SecondaryNavigationBar = () => {
  const { t } = useTranslation();
  const { isDataVaultUnlocked, setIsDataVaultUnlocked } =
    useContext(DataVaultContext);

  if (!isDataVaultUnlocked) {
    return;
  }

  return (
    <nav>
      <ul>
        <NavLink to="/data-vault/accounts">{t("navBar.accounts")}</NavLink>
        <NavLink to="/data-vault/contacts">{t("navBar.contacts")}</NavLink>
        <NavLink to="/data-vault/notes">{t("navBar.notes")}</NavLink>
        <NavLink to="/data-vault/banks">{t("navBar.bankInfo")}</NavLink>
        <li>
          <Button
            className="nav-bar__button"
            modifier="hover"
            onClick={() => setIsDataVaultUnlocked(false)}
          >
            {"navBar.lock"}
          </Button>
        </li>
      </ul>
    </nav>
  );
};
