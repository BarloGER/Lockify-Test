import PropTypes from "prop-types";
import "./assets/account-template.css";

export const AccountsTemplate = ({ children }) => {
  return <main className="accounts-template">{children}</main>;
};

AccountsTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
