import PropTypes from "prop-types";
import { BankCard } from "../molecules";
import "./assets/banks-overview.css";

export const BanksOverview = ({
  banks,
  onSelectBank,
  onEditBank,
  onDeleteBank,
  isBankLoading,
}) => {
  return (
    <section className="banks-overview">
      {banks.map((bank, index) => (
        <BankCard
          key={bank.bankId || index}
          bank={bank}
          onSelect={() => onSelectBank(bank.bankId)}
          onEdit={onEditBank}
          onDelete={onDeleteBank}
          isLoading={isBankLoading}
        />
      ))}
    </section>
  );
};

BanksOverview.propTypes = {
  banks: PropTypes.arrayOf(
    PropTypes.shape({
      bankId: PropTypes.number.isRequired,
      bankName: PropTypes.string,
      accountHolderFirstName: PropTypes.string,
      accountHolderLastName: PropTypes.string,
      decryptedIban: PropTypes.string,
      swiftBic: PropTypes.string,
      accountType: PropTypes.string,
      branchCode: PropTypes.string,
      cardHolderFirstName: PropTypes.string,
      cardHolderLastName: PropTypes.string,
      decryptedCardNumber: PropTypes.string,
      expiryDate: PropTypes.string,
      decryptedCardCvvCvc: PropTypes.string,
      cardType: PropTypes.string,
    })
  ).isRequired,
  onSelectBank: PropTypes.func.isRequired,
  onEditBank: PropTypes.func.isRequired,
  onDeleteBank: PropTypes.func.isRequired,
  isBankLoading: PropTypes.bool,
};
