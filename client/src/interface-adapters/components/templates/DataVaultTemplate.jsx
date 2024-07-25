import PropTypes from "prop-types";
import "./assets/data-vault-template.css";

export const DataVaultTemplate = ({ children }) => {
  return <main className="data-vault-template">{children}</main>;
};

DataVaultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
