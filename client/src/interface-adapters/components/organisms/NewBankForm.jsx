import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/new-bank-form.css";

export const NewBankForm = ({
  formValues,
  setFormValues,
  handleChange,
  handleSubmit,
  isBankLoading,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setFormValues({
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
    <div className={`new-bank__form ${isCreating ? "creating" : ""}`}>
      <div className="new-bank__form_inner">
        <div className="new-bank__form_front">
          <div className="plus-container" onClick={handlePlusClick}>
            <span className="plus">+</span>
          </div>
        </div>
        <div className="new-bank__form_back">
          <form onSubmit={handleSubmit}>
            <Input
              id="bankName"
              name="bankName"
              label={t("bank.bankName")}
              value={formValues.bankName}
              onChange={handleChange}
            />
            <Input
              id="accountHolderFirstName"
              name="accountHolderFirstName"
              label={t("bank.accountHolderFirstName")}
              value={formValues.accountHolderFirstName}
              onChange={handleChange}
            />
            <Input
              id="accountHolderLastName"
              name="accountHolderLastName"
              label={t("bank.accountHolderLastName")}
              value={formValues.accountHolderLastName}
              onChange={handleChange}
            />
            <Input
              id="iban"
              name="iban"
              label={t("bank.iban")}
              type="iban"
              value={formValues.iban}
              onChange={handleChange}
            />
            <Input
              id="swiftBic"
              name="swiftBic"
              label={t("bank.swiftBic")}
              type="swiftBic"
              value={formValues.swiftBic}
              onChange={handleChange}
            />
            <Input
              id="accountType"
              name="accountType"
              label={t("bank.accountType")}
              type="accountType"
              value={formValues.accountType}
              onChange={handleChange}
            />
            <Input
              id="branchCode"
              name="branchCode"
              label={t("bank.branchCode")}
              type="branchCode"
              value={formValues.branchCode}
              onChange={handleChange}
            />
            <Input
              id="cardHolderFirstName"
              name="cardHolderFirstName"
              label={t("bank.cardHolderFirstName")}
              type="cardHolderFirstName"
              value={formValues.cardHolderFirstName}
              onChange={handleChange}
            />
            <Input
              id="cardHolderLastName"
              name="cardHolderLastName"
              label={t("bank.cardHolderLastName")}
              type="cardHolderLastName"
              value={formValues.cardHolderLastName}
              onChange={handleChange}
            />
            <Input
              id="cardNumber"
              name="cardNumber"
              label={t("bank.cardNumber")}
              type="cardNumber"
              value={formValues.cardNumber}
              onChange={handleChange}
            />
            <Input
              id="expiryDate"
              name="expiryDate"
              label={t("bank.expiryDate")}
              type="expiryDate"
              value={formValues.expiryDate}
              onChange={handleChange}
            />
            <Input
              id="cardCvvCvc"
              name="cardCvvCvc"
              label={t("bank.cardCvvCvc")}
              type="cardCvvCvc"
              value={formValues.cardCvvCvc}
              onChange={handleChange}
            />
            <Input
              id="cardType"
              name="cardType"
              label={t("bank.cardType")}
              value={formValues.cardType}
              onChange={handleChange}
            />

            <SubmitButton
              className="bank-form__button"
              modifier="hover"
              isLoading={isBankLoading}
            >
              {t("bank.submitNewBank")}
            </SubmitButton>

            <Button onClick={handlePlusClick} modifier="hover">
              {t("bank.cancel")}
            </Button>

            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="bank-form__flash-message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

NewBankForm.propTypes = {
  formValues: PropTypes.shape({
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
  setFormValues: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isBankLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
