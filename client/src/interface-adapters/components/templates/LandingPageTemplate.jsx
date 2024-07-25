import PropTypes from "prop-types";
import "./assets/landing-page-template.css";

export const LandingPageTemplate = ({ children }) => {
  return <main className="landing-page-template">{children}</main>;
};

LandingPageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
