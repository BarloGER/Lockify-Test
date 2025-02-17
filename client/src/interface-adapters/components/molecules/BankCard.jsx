import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Heading1,
  Input,
  Span,
  Button,
  ToggleVisibilityButton,
  CopyButton,
} from "../atoms";
import { SubmitButton } from "./SubmitButton";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import "./assets/bank-card.css";

export const BankCard = ({
  bank,
  processUpdateBank,
  processDeleteBank,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isIbanHidden, setIsIbanHidden] = useState(true);
  const [isCardNumberHidden, setIsCardNumberHidden] = useState(true);
  const [isCardCvvCvcHidden, setIsCardCvvCvcHidden] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedBank, setEditedBank] = useState({
    bankName: bank.bankName,
    accountHolderFirstName: bank.accountHolderFirstName,
    accountHolderLastName: bank.accountHolderLastName,
    iban: bank.decryptedIban,
    swiftBic: bank.swiftBic,
    accountType: bank.accountType,
    branchCode: bank.branchCode,
    cardHolderFirstName: bank.cardHolderFirstName,
    cardHolderLastName: bank.cardHolderLastName,
    cardNumber: bank.decryptedCardNumber,
    expiryDate: bank.expiryDate,
    cardCvvCvc: bank.decryptedCardCvvCvc,
    cardType: bank.cardType,
  });

  const handleChange = (e, field) => {
    setEditedBank({ ...editedBank, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateBankFormData = {
      bankName: e.target.bankName.value,
      accountHolderFirstName: e.target.accountHolderFirstName.value,
      accountHolderLastName: e.target.accountHolderLastName.value,
      iban: e.target.iban.value,
      swiftBic: e.target.swiftBic.value,
      accountType: e.target.accountType.value,
      branchCode: e.target.branchCode.value,
      cardHolderFirstName: e.target.cardHolderFirstName.value,
      cardHolderLastName: e.target.cardHolderLastName.value,
      cardNumber: e.target.cardNumber.value,
      expiryDate: e.target.expiryDate.value,
      cardCvvCvc: e.target.cardCvvCvc.value,
      cardType: e.target.cardType.value,
    };

    processUpdateBank(e, bank.bankId, updateBankFormData, setIsEditing);
    setIsEditing(false);
  };

  return (
    <div className="bank-card">
      <div
        className="bank-card__title"
        onClick={() => setIsClicked(!isClicked)}
      >
        <Heading1 text={bank.bankName} />
        {isClicked ? <SlArrowUp /> : <SlArrowDown />}
      </div>

      {isClicked && (
        <div className="bank-card--expanded">
          {isEditing ? (
            <div className="bank-card--editing">
              <form onSubmit={handleSubmit} className="bank__form">
                <Input
                  id={`bankName-${bank.bankId}`}
                  label="banksPage.bankName"
                  type="text"
                  value={editedBank.bankName}
                  onChange={(e) => handleChange(e, "bankName")}
                  name="bankName"
                />
                <Input
                  id={`accountHolderFirstName-${bank.bankId}`}
                  label="banksPage.accountHolderFirstName"
                  type="text"
                  value={editedBank.accountHolderFirstName}
                  onChange={(e) => handleChange(e, "accountHolderFirstName")}
                  name="accountHolderFirstName"
                />
                <Input
                  id={`accountHolderLastName-${bank.bankId}`}
                  label="banksPage.accountHolderLastName"
                  type="text"
                  value={editedBank.accountHolderLastName}
                  onChange={(e) => handleChange(e, "accountHolderLastName")}
                  name="accountHolderLastName"
                />
                <Input
                  id={`iban-${bank.bankId}`}
                  label="banksPage.iban"
                  type="text"
                  value={editedBank.iban}
                  onChange={(e) => handleChange(e, "iban")}
                  name="iban"
                />
                <Input
                  id={`swiftBic-${bank.bankId}`}
                  label="banksPage.swiftBic"
                  type="text"
                  value={editedBank.swiftBic}
                  onChange={(e) => handleChange(e, "swiftBic")}
                  name="swiftBic"
                />
                <Input
                  id={`accountType-${bank.bankId}`}
                  label="banksPage.accountType"
                  type="text"
                  value={editedBank.accountType}
                  onChange={(e) => handleChange(e, "accountType")}
                  name="accountType"
                />
                <Input
                  id={`branchCode-${bank.bankId}`}
                  label="banksPage.branchCode"
                  type="text"
                  value={editedBank.branchCode}
                  onChange={(e) => handleChange(e, "branchCode")}
                  name="branchCode"
                />
                <Input
                  id={`cardHolderFirstName-${bank.bankId}`}
                  label="banksPage.cardHolderFirstName"
                  type="text"
                  value={editedBank.cardHolderFirstName}
                  onChange={(e) => handleChange(e, "cardHolderFirstName")}
                  name="cardHolderFirstName"
                />
                <Input
                  id={`cardHolderLastName-${bank.bankId}`}
                  label="banksPage.cardHolderLastName"
                  type="text"
                  value={editedBank.cardHolderLastName}
                  onChange={(e) => handleChange(e, "cardHolderLastName")}
                  name="cardHolderLastName"
                />
                <Input
                  id={`cardNumber-${bank.bankId}`}
                  label="banksPage.cardNumber"
                  type="text"
                  value={editedBank.cardNumber}
                  onChange={(e) => handleChange(e, "cardNumber")}
                  name="cardNumber"
                />
                <Input
                  id={`expiryDate-${bank.bankId}`}
                  label="banksPage.expiryDate"
                  type="text"
                  value={editedBank.expiryDate}
                  onChange={(e) => handleChange(e, "expiryDate")}
                  name="expiryDate"
                />
                <Input
                  id={`cardCvvCvc-${bank.bankId}`}
                  label="banksPage.cardCvvCvc"
                  type="text"
                  value={editedBank.cardCvvCvc}
                  onChange={(e) => handleChange(e, "cardCvvCvc")}
                  name="cardCvvCvc"
                />

                <Input
                  id={`cardType-${bank.bankId}`}
                  label="banksPage.cardType"
                  type="text"
                  value={editedBank.cardType}
                  onChange={(e) => handleChange(e, "cardType")}
                  name="cardType"
                />
                <div className="bank-card__button-wrapper">
                  <SubmitButton isLoading={isLoading}>
                    {t("banksPage.submitEdit")}
                  </SubmitButton>
                  <Button onClick={() => setIsEditing(false)}>
                    {t("banksPage.cancel")}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bank-card--overview">
              <div className="bank-card__info-container">
                <strong>{t("banksPage.bankName")}:</strong>{" "}
                <Span text={bank.bankName} />
              </div>
              <div className="bank-card__info-container">
                {" "}
                <strong>{t("banksPage.accountHolderFirstName")}:</strong>{" "}
                <Span text={bank.accountHolderFirstName} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.accountHolderLastName")}:</strong>{" "}
                <Span text={bank.accountHolderLastName} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.iban")}:</strong>{" "}
                <div className="bank-card__password-container">
                  <Span text={bank.decryptedIban || ""} state={isIbanHidden} />
                  <ToggleVisibilityButton
                    isValueHidden={isIbanHidden}
                    onClick={() => setIsIbanHidden(!isIbanHidden)}
                  />
                  <CopyButton
                    onClick={() =>
                      navigator.clipboard.writeText(bank.decryptedIban)
                    }
                  />
                </div>
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.swiftBic")}:</strong>{" "}
                <Span text={bank.swiftBic} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.accountType")}:</strong>{" "}
                <Span text={bank.accountType} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.branchCode")}:</strong>{" "}
                <Span text={bank.branchCode} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.cardHolderFirstName")}:</strong>{" "}
                <Span text={bank.cardHolderFirstName} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.cardHolderLastName")}:</strong>{" "}
                <Span text={bank.cardHolderLastName} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.cardNumber")}:</strong>{" "}
                <div className="bank-card__password-container">
                  <Span
                    text={bank.decryptedCardNumber || ""}
                    state={isCardNumberHidden}
                  />
                  <ToggleVisibilityButton
                    isValueHidden={isCardNumberHidden}
                    onClick={() => setIsCardNumberHidden(!isCardNumberHidden)}
                  />
                  <CopyButton
                    onClick={() =>
                      navigator.clipboard.writeText(bank.decryptedCardNumber)
                    }
                  />
                </div>
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.expiryDate")}:</strong>{" "}
                <Span text={bank.expiryDate} />
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.cardCvvCvc")}:</strong>{" "}
                <div className="bank-card__password-container">
                  <Span
                    text={bank.decryptedCardCvvCvc || ""}
                    state={isCardCvvCvcHidden}
                  />
                  <ToggleVisibilityButton
                    isValueHidden={isCardCvvCvcHidden}
                    onClick={() => setIsCardCvvCvcHidden(!isCardCvvCvcHidden)}
                  />
                  <CopyButton
                    onClick={() =>
                      navigator.clipboard.writeText(bank.decryptedCardCvvCvc)
                    }
                  />
                </div>
              </div>
              <div className="bank-card__info-container">
                <strong>{t("banksPage.cardType")}:</strong>{" "}
                <Span text={bank.cardType} />
              </div>
              {isDeleting ? (
                <div className="bank-card__button-wrapper">
                  <Button
                    type="button"
                    onClick={() => {
                      processDeleteBank(bank.bankId), setIsDeleting(false);
                    }}
                  >
                    {t("banksPage.submitDelete")}
                  </Button>
                  <Button onClick={() => setIsDeleting(false)}>
                    {t("banksPage.cancel")}
                  </Button>
                </div>
              ) : (
                <div className="bank-card__button-wrapper">
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    {t("banksPage.edit")}
                  </Button>
                  <Button onClick={() => setIsDeleting(true)}>
                    {t("banksPage.delete")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

BankCard.propTypes = {
  bank: PropTypes.shape({
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
  }).isRequired,
  handleSelectBankForEdit: PropTypes.func.isRequired,
  processUpdateBank: PropTypes.func.isRequired,
  processDeleteBank: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
