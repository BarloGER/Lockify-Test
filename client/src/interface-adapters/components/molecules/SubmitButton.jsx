import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import "./assets/submit-button.css";

export const SubmitButton = ({
  children,
  isLoading,
  type = "submit",
  className = "submit-button",
  modifier = "hover",
}) => {
  const { t } = useTranslation();

  const buttonClass = `submit-button ${
    modifier ? `submit-button--${modifier}` : ""
  } ${className}`;

  const renderContent = () => {
    if (isLoading) {
      return <FaSpinner className="spinner" />;
    }

    return t(children);
  };

  return (
    <button type={type} className={buttonClass} disabled={isLoading}>
      {renderContent()}
    </button>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  modifier: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};
