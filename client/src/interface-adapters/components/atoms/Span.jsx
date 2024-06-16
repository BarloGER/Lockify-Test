import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/span.css";

export const Span = ({ text }) => {
  const { t } = useTranslation();
  return <span className="span__field">{t(text)}</span>;
};

Span.propTypes = {
  text: PropTypes.string.isRequired,
};
