import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/paragraph.css";

export const Paragraph = ({ text }) => {
  const { t } = useTranslation();
  return <p className="paragraph__field">{t(text)}</p>;
};

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
};
