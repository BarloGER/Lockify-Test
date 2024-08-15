import PropTypes from "prop-types";
import "./assets/bank-template.css";

export const BankTemplate = ({ children }) => {
  return <main className="banks-template">{children}</main>;
};

BankTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
