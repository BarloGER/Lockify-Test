import PropTypes from "prop-types";
import "./assets/register-template.css";

export const RegisterTemplate = ({ children }) => {
  return <main className="register-template">{children}</main>;
};

RegisterTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};
