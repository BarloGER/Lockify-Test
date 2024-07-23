import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { Button } from "../atoms";
import "./assets/settings.css";

export const Settings = () => {
  const { t } = useTranslation();
  const { changeDesign } = useContext(DesignContext);

  return (
    <div className="settings">
      <Button onClick={() => changeDesign("design1")}>
        {t("setting.darkMode")}
      </Button>
      <Button onClick={() => changeDesign("design2")}>
        {t("setting.lightMode")}
      </Button>
    </div>
  );
};
