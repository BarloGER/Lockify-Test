import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./assets/router-link.css";

export const RouterLink = ({
  path,
  children,
  className = "",
  modifier = "",
}) => {
  const { t } = useTranslation();

  const linkClass = `link ${modifier ? `link--${modifier}` : ""} ${className}`;

  return (
    <Link to={path} className={linkClass}>
      {t(children)}
    </Link>
  );
};

RouterLink.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  modifier: PropTypes.string,
};
