import PropTypes from "prop-types";
import { AccountCard } from "../molecules";
import "./assets/accounts-overview.css";

export const AccountsOverview = ({
  accounts,
  onSelectAccount,
  onEditAccount,
  onDeleteAccount,
  isAccountLoading,
}) => {
  return (
    <section className="accounts-overview">
      {accounts.map((account, index) => (
        <AccountCard
          key={account.accountId || index}
          account={account}
          onSelect={() => onSelectAccount(account.accountId)}
          onEdit={onEditAccount}
          onDelete={onDeleteAccount}
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
  onSelectAccount: PropTypes.func.isRequired,
  onEditAccount: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  isAccountLoading: PropTypes.bool,
};
