import PropTypes from "prop-types";
import "./assets/auth-template.css";

export const AuthTemplate = ({ children }) => {
  return <section className="auth-template">{children}</section>;
};

AuthTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};
