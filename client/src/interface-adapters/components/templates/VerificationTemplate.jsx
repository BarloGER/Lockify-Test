import PropTypes from "prop-types";
import "./assets/verification-template.css";

export const VerificationTemplate = ({ children }) => {
  return <main className="verification-template">{children}</main>;
};

VerificationTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
