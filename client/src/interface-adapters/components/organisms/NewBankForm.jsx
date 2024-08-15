import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/new-bank-form.css";

export const NewBankForm = ({
  newBankFormData,
  setNewBankFormData,
  handleChange,
  processCreateBank,
  isBankLoading,
  message,
  setMessage,
  messageType,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setNewBankFormData({
      bankName: "",
      accountHolderFirstName: "",
      accountHolderLastName: "",
      iban: "",
      swiftBic: "",
      accountType: "",
      branchCode: "",
      cardHolderFirstName: "",
      cardHolderLastName: "",
      cardNumber: "",
      expiryDate: "",
      cardCvvCvc: "",
      cardType: "",
    });
  };

  return (
    <div className="new-bank-form">
      {isCreating ? (
        <div className="new-bank-form__inner">
          <form onSubmit={processCreateBank}>
            <Input
              id="bankName"
              name="bankName"
              label="banksPage.bankName"
              value={newBankFormData.bankName}
              onChange={handleChange}
            />
            <Input
              id="accountHolderFirstName"
              name="accountHolderFirstName"
              label="banksPage.accountHolderFirstName"
              value={newBankFormData.accountHolderFirstName}
              onChange={handleChange}
            />
            <Input
              id="accountHolderLastName"
              name="accountHolderLastName"
              label="banksPage.accountHolderLastName"
              value={newBankFormData.accountHolderLastName}
              onChange={handleChange}
            />
            <Input
              id="iban"
              name="iban"
              label="banksPage.iban"
              type="iban"
              value={newBankFormData.iban}
              onChange={handleChange}
            />
            <Input
              id="swiftBic"
              name="swiftBic"
              label="banksPage.swiftBic"
              type="swiftBic"
              value={newBankFormData.swiftBic}
              onChange={handleChange}
            />
            <Input
              id="accountType"
              name="accountType"
              label="banksPage.accountType"
              type="accountType"
              value={newBankFormData.accountType}
              onChange={handleChange}
            />
            <Input
              id="branchCode"
              name="branchCode"
              label="banksPage.branchCode"
              type="branchCode"
              value={newBankFormData.branchCode}
              onChange={handleChange}
            />
            <Input
              id="cardHolderFirstName"
              name="cardHolderFirstName"
              label="banksPage.cardHolderFirstName"
              type="cardHolderFirstName"
              value={newBankFormData.cardHolderFirstName}
              onChange={handleChange}
            />
            <Input
              id="cardHolderLastName"
              name="cardHolderLastName"
              label="banksPage.cardHolderLastName"
              type="cardHolderLastName"
              value={newBankFormData.cardHolderLastName}
              onChange={handleChange}
            />
            <Input
              id="cardNumber"
              name="cardNumber"
              label="banksPage.cardNumber"
              type="cardNumber"
              value={newBankFormData.cardNumber}
              onChange={handleChange}
            />
            <Input
              id="expiryDate"
              name="expiryDate"
              label="banksPage.expiryDate"
              type="expiryDate"
              value={newBankFormData.expiryDate}
              onChange={handleChange}
            />
            <Input
              id="cardCvvCvc"
              name="cardCvvCvc"
              label="banksPage.cardCvvCvc"
              type="cardCvvCvc"
              value={newBankFormData.cardCvvCvc}
              onChange={handleChange}
            />
            <Input
              id="cardType"
              name="cardType"
              label="banksPage.cardType"
              value={newBankFormData.cardType}
              onChange={handleChange}
            />
            <div className="new-bank-form__button-wrapper">
              <SubmitButton
                className="new-bank-form__button"
                modifier="hover"
                isLoading={isBankLoading}
              >
                {"banksPage.submitNewBank"}
              </SubmitButton>

              <Button onClick={handlePlusClick} modifier="hover">
                {"banksPage.cancel"}
              </Button>
            </div>
            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="new-bank-form__flash-message"
            />
          </form>
        </div>
      ) : (
        <div
          className="new-bank-form__inner"
          onClick={() => setIsCreating(!isCreating)}
        >
          <span className="plus">+</span>
        </div>
      )}
    </div>
  );
};

NewBankForm.propTypes = {
  newBankFormData: PropTypes.shape({
    bankName: PropTypes.string,
    accountHolderFirstName: PropTypes.string,
    accountHolderLastName: PropTypes.string,
    iban: PropTypes.string,
    swiftBic: PropTypes.string,
    accountType: PropTypes.string,
    branchCode: PropTypes.string,
    cardHolderFirstName: PropTypes.string,
    cardHolderLastName: PropTypes.string,
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cardCvvCvc: PropTypes.string,
    cardType: PropTypes.string,
  }).isRequired,
  setNewBankFormData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  processCreateBank: PropTypes.func.isRequired,
  isBankLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
