import PropTypes from "prop-types";
import "./assets/authentication-template.css";

export const AuthenticationTemplate = ({ children }) => {
  return <main className="authentication-template">{children}</main>;
};

AuthenticationTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};
