import { useTranslation } from "react-i18next";
import "./assets/loading-organism.css";

export const LoadingOrganism = () => {
  const { t } = useTranslation();

  return (
    <div className="loading-organism">
      <div className="loading-organism__loader"></div>
      <h1 className="loading-organism__text">{t("loadingScreenPage.text")}</h1>
    </div>
  );
};
