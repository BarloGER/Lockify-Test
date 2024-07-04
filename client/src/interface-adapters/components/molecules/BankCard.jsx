import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Span, Button } from "../atoms";
import { SubmitButton } from "./SubmitButton";
import "./assets/bank-card.css";

export const BankCard = ({ bank, onSelect, onEdit, onDelete, isLoading }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
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
    const formValues = {
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

    onEdit(e, bank.bankId, formValues);
    setIsEditing(false);
  };

  return (
    <div className={`bank__card ${isEditing ? "editing" : ""}`}>
      <div className="bank__card_inner">
        <div className="bank__card_front" onClick={() => onSelect(bank.bankId)}>
          <p>
            <strong>{t("bank.bankName")}:</strong> <Span text={bank.bankName} />
          </p>
          <p>
            <strong>{t("bank.accountHolderFirstName")}:</strong>{" "}
            <Span text={bank.accountHolderFirstName} />
          </p>
          <p>
            <strong>{t("bank.accountHolderLastName")}:</strong>{" "}
            <Span text={bank.accountHolderLastName} />
          </p>
          <p>
            <strong>{t("bank.iban")}:</strong>{" "}
            <Span text={bank.decryptedIban} />
          </p>
          <p>
            <strong>{t("bank.swiftBic")}:</strong> <Span text={bank.swiftBic} />
          </p>
          <p>
            <strong>{t("bank.accountType")}:</strong>{" "}
            <Span text={bank.accountType} />
          </p>
          <p>
            <strong>{t("bank.branchCode")}:</strong>{" "}
            <Span text={bank.branchCode} />
          </p>
          <p>
            <strong>{t("bank.cardHolderFirstName")}:</strong>{" "}
            <Span text={bank.cardHolderFirstName} />
          </p>
          <p>
            <strong>{t("bank.cardHolderLastName")}:</strong>{" "}
            <Span text={bank.cardHolderLastName} />
          </p>
          <p>
            <strong>{t("bank.cardNumber")}:</strong>{" "}
            <Span text={bank.decryptedCardNumber} />
          </p>
          <p>
            <strong>{t("bank.expiryDate")}:</strong>{" "}
            <Span text={bank.expiryDate} />
          </p>
          <p>
            <strong>{t("bank.cardCvvCvc")}:</strong>{" "}
            <Span text={bank.decryptedCardCvvCvc} />
          </p>
          <p>
            <strong>{t("bank.cardType")}:</strong> <Span text={bank.cardType} />
          </p>
          {isDeleting ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  onDelete(bank.bankId), setIsDeleting(false);
                }}
              >
                {t("bank.submitDelete")}
              </Button>
              <Button onClick={() => setIsDeleting(false)}>
                {t("bank.cancel")}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {t("bank.edit")}
              </Button>
              <Button onClick={() => setIsDeleting(true)}>
                {t("bank.delete")}
              </Button>
            </>
          )}
        </div>
        <div className="bank__card_back">
          <form onSubmit={handleSubmit} className="bank__form">
            <Input
              id={`bankName-${bank.bankId}`}
              label={t("bank.bankName")}
              type="text"
              value={editedBank.bankName}
              onChange={(e) => handleChange(e, "bankName")}
              name="bankName"
            />
            <Input
              id={`accountHolderFirstName-${bank.bankId}`}
              label={t("bank.accountHolderFirstName")}
              type="text"
              value={editedBank.accountHolderFirstName}
              onChange={(e) => handleChange(e, "accountHolderFirstName")}
              name="accountHolderFirstName"
            />
            <Input
              id={`accountHolderLastName-${bank.bankId}`}
              label={t("bank.accountHolderLastName")}
              type="text"
              value={editedBank.accountHolderLastName}
              onChange={(e) => handleChange(e, "accountHolderLastName")}
              name="accountHolderLastName"
            />
            <Input
              id={`iban-${bank.bankId}`}
              label={t("bank.iban")}
              type="text"
              value={editedBank.iban}
              onChange={(e) => handleChange(e, "iban")}
              name="iban"
            />
            <Input
              id={`swiftBic-${bank.bankId}`}
              label={t("bank.swiftBic")}
              type="text"
              value={editedBank.swiftBic}
              onChange={(e) => handleChange(e, "swiftBic")}
              name="swiftBic"
            />
            <Input
              id={`accountType-${bank.bankId}`}
              label={t("bank.accountType")}
              type="text"
              value={editedBank.accountType}
              onChange={(e) => handleChange(e, "accountType")}
              name="accountType"
            />
            <Input
              id={`branchCode-${bank.bankId}`}
              label={t("bank.branchCode")}
              type="text"
              value={editedBank.branchCode}
              onChange={(e) => handleChange(e, "branchCode")}
              name="branchCode"
            />
            <Input
              id={`cardHolderFirstName-${bank.bankId}`}
              label={t("bank.cardHolderFirstName")}
              type="text"
              value={editedBank.cardHolderFirstName}
              onChange={(e) => handleChange(e, "cardHolderFirstName")}
              name="cardHolderFirstName"
            />
            <Input
              id={`cardHolderLastName-${bank.bankId}`}
              label={t("bank.cardHolderLastName")}
              type="text"
              value={editedBank.cardHolderLastName}
              onChange={(e) => handleChange(e, "cardHolderLastName")}
              name="cardHolderLastName"
            />
            <Input
              id={`cardNumber-${bank.bankId}`}
              label={t("bank.cardNumber")}
              type="text"
              value={editedBank.cardNumber}
              onChange={(e) => handleChange(e, "cardNumber")}
              name="cardNumber"
            />
            <Input
              id={`expiryDate-${bank.bankId}`}
              label={t("bank.expiryDate")}
              type="text"
              value={editedBank.expiryDate}
              onChange={(e) => handleChange(e, "expiryDate")}
              name="expiryDate"
            />
            <Input
              id={`cardCvvCvc-${bank.bankId}`}
              label={t("bank.cardCvvCvc")}
              type="text"
              value={editedBank.cardCvvCvc}
              onChange={(e) => handleChange(e, "cardCvvCvc")}
              name="cardCvvCvc"
            />

            <Input
              id={`cardType-${bank.bankId}`}
              label={t("bank.cardType")}
              type="text"
              value={editedBank.cardType}
              onChange={(e) => handleChange(e, "cardType")}
              name="cardType"
            />
            <div>
              <SubmitButton isLoading={isLoading}>
                {t("bank.submitEdit")}
              </SubmitButton>
              <Button onClick={() => setIsEditing(false)}>
                {t("bank.cancel")}
              </Button>
            </div>
          </form>
        </div>
      </div>
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
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
