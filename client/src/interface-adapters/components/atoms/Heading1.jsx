import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/heading1.css";

export const Heading1 = ({ text }) => {
  const { t } = useTranslation();

  return <h1 className="title">{t(text)}</h1>;
};

Heading1.propTypes = {
  text: PropTypes.string.isRequired,
};
