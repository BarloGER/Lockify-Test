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
    <section className="accounts-overview">
      {accounts.map((account, index) => (
        <AccountCard
          key={account.accountId || index}
          account={account}
          handleSelectAccountForEdit={() =>
            handleSelectAccountForEdit(account.accountId)
          }
          processUpdateAccount={processUpdateAccount}
          processDeleteAccount={processDeleteAccount}
          isLoading={isAccountLoading}
        />
      ))}
    </section>
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
    })
  ).isRequired,
  handleSelectAccountForEdit: PropTypes.func.isRequired,
  processUpdateAccount: PropTypes.func.isRequired,
  processDeleteAccount: PropTypes.func.isRequired,
  isAccountLoading: PropTypes.bool,
};
