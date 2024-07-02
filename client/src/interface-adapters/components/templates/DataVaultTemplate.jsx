import PropTypes from "prop-types";
import "./assets/data-vault-template.css";

export const DataVaultTemplate = ({ children, message }) => {
  return (
    <div className="data-vault-template">
      {children}
      {message && <div className="data-vault-template__message">{message}</div>}
    </div>
  );
};

DataVaultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.string,
};
