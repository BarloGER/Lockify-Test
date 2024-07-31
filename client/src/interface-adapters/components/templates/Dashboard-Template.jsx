import PropTypes from "prop-types";
import "./assets/dashboard-template.css";

export const DashboardTemplate = ({ children }) => {
  return <main className="dashboard-template">{children}</main>;
};

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
