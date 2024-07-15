import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/span.css";

export const Span = ({ text = "", state }) => {
  const { t } = useTranslation();

  return (
    <span className="span__field">{state ? "************" : t(text)}</span>
  );
};

Span.propTypes = {
  text: PropTypes.string,
  state: PropTypes.bool,
};
