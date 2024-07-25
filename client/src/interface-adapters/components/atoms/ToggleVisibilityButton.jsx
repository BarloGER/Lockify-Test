import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./assets/toggle-visibility-button.css";

export const ToggleVisibilityButton = ({ isValueHidden, setIsValueHidden }) => {
  return (
    <button
      className="toggle-visibility-button"
      type="button"
      onClick={() => setIsValueHidden(!isValueHidden)}
    >
      {isValueHidden ? <FaEye /> : <FaEyeSlash />}
    </button>
  );
};

ToggleVisibilityButton.propTypes = {
  isValueHidden: PropTypes.bool.isRequired,
  setIsValueHidden: PropTypes.func.isRequired,
};
