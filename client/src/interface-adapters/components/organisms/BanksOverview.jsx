import PropTypes from "prop-types";
import { BankCard } from "../molecules";
import "./assets/banks-overview.css";

export const BanksOverview = ({
  banks,
  handleSelectBankForEdit,
  processUpdateBank,
  processDeleteBank,
  isBankLoading,
}) => {
  return (
    <ul className="banks-overview">
      {banks.map((bank, index) => (
        <li key={bank.bankId || index}>
          <BankCard
            bank={bank}
            handleSelectBankForEdit={() => handleSelectBankForEdit(bank.bankId)}
            processUpdateBank={processUpdateBank}
            processDeleteBank={processDeleteBank}
            isLoading={isBankLoading}
          />
        </li>
      ))}
    </ul>
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
    }),
  ).isRequired,
  handleSelectBankForEdit: PropTypes.func.isRequired,
  processUpdateBank: PropTypes.func.isRequired,
  processDeleteBank: PropTypes.func.isRequired,
  isBankLoading: PropTypes.bool,
};
