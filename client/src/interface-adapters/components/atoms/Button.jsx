import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/button.css";

export const Button = ({
  children,
  onClick,
  type = "button",
  className = "button",
  modifier = "hover",
}) => {
  const { t } = useTranslation();

  const buttonClass = `button ${
    modifier ? `button--${modifier}` : ""
  } ${className}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {t(children)}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  modifier: PropTypes.string,
};
