import PropTypes from "prop-types";
import { AccountCard } from "../molecules";
import "./assets/accounts-overview.css";

export const AccountsOverview = ({
  accounts,
  handleSelectAccountForEdit,
  processUpdateAccount,
  processDeleteAccount,
  isAccountLoading,
}) => {
  return (
    <ul className="accounts-overview">
      {accounts.map((account, index) => (
        <li key={account.accountId || index}>
          <AccountCard
            account={account}
            handleSelectAccountForEdit={() =>
              handleSelectAccountForEdit(account.accountId)
            }
            processUpdateAccount={processUpdateAccount}
            processDeleteAccount={processDeleteAccount}
            isLoading={isAccountLoading}
          />
        </li>
      ))}
    </ul>
  );
};

AccountsOverview.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      accountId: PropTypes.number.isRequired,
      accountName: PropTypes.string,
      accountUrl: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      decryptedPassword: PropTypes.string,
      decryptedNotes: PropTypes.string,
    }),
  ).isRequired,
  handleSelectAccountForEdit: PropTypes.func.isRequired,
  processUpdateAccount: PropTypes.func.isRequired,
  processDeleteAccount: PropTypes.func.isRequired,
  isAccountLoading: PropTypes.bool,
};
