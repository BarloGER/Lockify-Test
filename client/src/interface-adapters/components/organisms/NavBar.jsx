import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { Button } from "../atoms";

export const NavBar = () => {
  const { t } = useTranslation();
  const { isDataVaultUnlocked, setIsDataVaultUnlocked } =
    useContext(AuthContext);

  return (
    <nav>
      <ul>
        <NavLink to="/">{t("navBar.home")}</NavLink>
        <NavLink to="/auth/data-vault">{t("navBar.dataVault")}</NavLink>
        {isDataVaultUnlocked && (
          <ul>
            <NavLink to="/auth/data-vault/accounts">
              {t("navBar.accounts")}
            </NavLink>
            <NavLink to="/auth/data-vault/addresses">
              {t("navBar.addresses")}
            </NavLink>
            <NavLink to="/auth/data-vault/notes">{t("navBar.notes")}</NavLink>
            <NavLink to="/auth/data-vault/bank-info">
              {t("navBar.bankInfo")}
            </NavLink>
            <li>
              <Button
                className="nav-bar__button"
                modifier="hover"
                onClick={() => setIsDataVaultUnlocked(false)}
              >
                {t("navBar.lock")}
              </Button>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};
