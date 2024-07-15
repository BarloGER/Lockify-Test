import PropTypes from "prop-types";
import { FaCopy } from "react-icons/fa";
import "./assets/copy-button.css";

export const CopyButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <FaCopy />
    </button>
  );
};

CopyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
