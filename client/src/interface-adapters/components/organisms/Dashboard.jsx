import PropTypes from "prop-types";
import "./assets/dashboard.css";

export const Dashboard = ({ securityCheckResult, accounts }) => {
  const {
    unsecureAccounts,
    sufficientAccounts,
    strongAccounts,
    veryStrongAccounts,
    securityScore,
    duplicateAccounts,
  } = securityCheckResult;

  return (
    <div className="dashboard">
      <div className="dashboard__security-info">
        <h2>Sicherheitsinfos</h2>
        <p>Anzahl Accounts: {accounts.length}</p>
        <p>Anzahl unsicherer Passwörter: {unsecureAccounts.length}</p>
        <p>Anzahl ausreichender Passwörter: {sufficientAccounts.length}</p>
        <p>Anzahl starker Passwörter: {strongAccounts.length}</p>
        <p>Anzahl sehr starker Passwörter: {veryStrongAccounts.length}</p>
        <p>Anzahl doppelter Passwörter: {duplicateAccounts.length}</p>
        <p>Sicherheitsstatus: {securityScore}%</p>
        <div className="dashboard__security-status">
          <div
            className="dashboard__security-status-ring"
            style={{
              background: `conic-gradient(green ${securityScore}%, red 0)`,
            }}
          >
            <div className="dashboard__security-status-inner">
              {securityScore}%
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__not-optimal-passwords">
        <h2>Nicht Optimale Passwörter</h2>
        {unsecureAccounts.map((account) => (
          <div
            key={account.accountName}
            className="dashboard__password--unsecure"
          >
            {account.accountName}
          </div>
        ))}
        {sufficientAccounts.map((account) => (
          <div
            key={account.accountName}
            className="dashboard__password--sufficient"
          >
            {account.accountName}
          </div>
        ))}
        {strongAccounts.map((account) => (
          <div
            key={account.accountName}
            className="dashboard__password--strong"
          >
            {account.accountName}
          </div>
        ))}
      </div>
      <div className="dashboard__duplicate-passwords">
        <h2>Doppelte Passwörter</h2>
        {duplicateAccounts.map((account) => (
          <div
            key={account.accountName}
            className="dashboard__password--duplicate"
          >
            {account.accountName}
          </div>
        ))}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  securityCheckResult: PropTypes.shape({
    unsecureAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
    sufficientAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
    strongAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
    veryStrongAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
    securityScore: PropTypes.number.isRequired,
    duplicateAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      accountName: PropTypes.string.isRequired,
      decryptedPassword: PropTypes.string.isRequired,
    })
  ).isRequired,
};
