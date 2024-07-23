import PropTypes from "prop-types";
import "./assets/forgot-password-template.css";

export const ForgotPasswordTemplate = ({ children }) => {
  return <main className="forgot-password-template">{children}</main>;
};

ForgotPasswordTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
