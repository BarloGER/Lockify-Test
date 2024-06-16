import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./assets/flash-message.css";

export const FlashMessage = ({ message, setMessage, type }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return message ? (
    <div className={`flash-message flash-message--${type}`}>{t(message)}</div>
  ) : null;
};

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
