import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./assets/toggle-visibility-button.css";

export const ToggleVisibilityButton = ({ isValueHidden, onClick }) => {
  return (
    <button onClick={onClick}>
      {isValueHidden ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

ToggleVisibilityButton.propTypes = {
  isValueHidden: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
