import PropTypes from "prop-types";
import "./assets/user-profile-template.css";

export const UserProfileTemplate = ({ children }) => {
  return <main className="user-profile-template">{children}</main>;
};

UserProfileTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
