import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Heading1, Span } from "../atoms";
import "./assets/dashboard-security-check.css";

export const DashboardSecurityCheck = ({ securityCheckResult }) => {
  const { t } = useTranslation();

  if (!securityCheckResult) {
    return;
  }

  const {
    securityScore,
    emptyAccounts,
    unsecureAccounts,
    sufficientAccounts,
    strongAccounts,
    veryStrongAccounts,
    duplicateAccounts,
  } = securityCheckResult;

  const radius = 100;
  const strokeWidth = 30;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (securityScore / 100) * circumference;

  return (
    <div className="dashboard-security-check">
      <Heading1 text="dashboardPage.title" />
      <div className="dashboard-security-check__score">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="security-status-circle"
        >
          <circle
            className="security-status-outer-circle"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className="security-status-inner-circle"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{
              strokeDashoffset,
              transform: `rotate(-90deg)`,
              transformOrigin: "50% 50%",
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="security-status-text"
          >
            {securityScore}%
          </text>
        </svg>
      </div>
      <div className="dashboard-security-check__details">
        <div className="dashboard-security-check__detail">
          <Span text="dashboardPage.securityScore" />
          <Span text={`${securityScore}`} />
        </div>
        <div className="dashboard-security-check__detail">
          <Span text="dashboardPage.sufficientAccount" />
          <span>{sufficientAccounts.length}</span>
        </div>
        <div className="dashboard-security-check__detail">
          <Span text="dashboardPage.strongAccount" />
          <span>{strongAccounts.length}</span>
        </div>
        <div className="dashboard-security-check__detail">
          <Span text="dashboardPage.veryStrongAccount" />
          <span>{veryStrongAccounts.length}</span>
        </div>
      </div>
      <div className="dashboard-security-check__unsecure-accounts">
        <h3 className="dashboard-security-check__section-title">
          {t("dashboardPage.unsecureAccounts")}
        </h3>
        {unsecureAccounts.map((account, index) => (
          <div key={index} className="dashboard-security-check__account">
            {account.accountName}
          </div>
        ))}
      </div>
      <div className="dashboard-security-check__duplicate-accounts">
        <h3 className="dashboard-security-check__section-title">
          {t("dashboardPage.duplicateAccounts")}
        </h3>
        {duplicateAccounts.map((account, index) => (
          <div key={index} className="dashboard-security-check__account">
            {account.accountName}
          </div>
        ))}
      </div>
      <div className="dashboard-security-check__duplicate-accounts">
        <h3 className="dashboard-security-check__section-title">
          {t("dashboardPage.emptyAccounts")}
        </h3>
        {emptyAccounts.map((account, index) => (
          <div key={index} className="dashboard-security-check__account">
            {account.accountName}
          </div>
        ))}
      </div>
    </div>
  );
};

DashboardSecurityCheck.propTypes = {
  securityCheckResult: PropTypes.shape({
    securityScore: PropTypes.number.isRequired,
    emptyAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    unsecureAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    sufficientAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    strongAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    veryStrongAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    duplicateAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
};
