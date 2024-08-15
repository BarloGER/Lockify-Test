import PropTypes from "prop-types";
import "./assets/contact-template.css";

export const ContactTemplate = ({ children }) => {
  return <main className="contacts-template">{children}</main>;
};

ContactTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
