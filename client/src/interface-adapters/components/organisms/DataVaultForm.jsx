import PropTypes from "prop-types";
import { Input, Paragraph } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/data-vault-form.css";

export const DataVaultForm = ({
  masterPassword,
  setMasterPassword,
  handleMasterPasswordVerification,
  isDataVaultLoading,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleMasterPasswordVerification}>
      <Paragraph text="dataVault.text" />

      <Input
        id="masterPassword"
        name="masterPassword"
        label={t("dataVault.masterPassword")}
        type="password"
        value={masterPassword}
        onChange={(e) => setMasterPassword(e.target.value)}
      />
      <SubmitButton
        className="data-vault-form__button"
        modifier="hover"
        isLoading={isDataVaultLoading}
      >
        {t("dataVault.submitButton")}
      </SubmitButton>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="data-vault-form__flash-message"
      />
    </form>
  );
};

DataVaultForm.propTypes = {
  masterPassword: PropTypes.string.isRequired,
  setMasterPassword: PropTypes.func.isRequired,
  handleMasterPasswordVerification: PropTypes.func.isRequired,
  isDataVaultLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
