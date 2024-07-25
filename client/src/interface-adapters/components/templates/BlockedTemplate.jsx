import PropTypes from "prop-types";
import "./assets/blocked-template.css";

export const BlockedTemplate = ({ children }) => {
  return <main className="blocked-template">{children}</main>;
};

BlockedTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
