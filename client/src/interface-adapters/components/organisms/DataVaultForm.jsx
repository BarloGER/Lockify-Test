import PropTypes from "prop-types";
import { Input, Paragraph } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/data-vault-form.css";

export const DataVaultForm = ({
  masterPassword,
  setMasterPassword,
  processMasterPasswordVerification,
  isDataVaultLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form onSubmit={processMasterPasswordVerification}>
      <Paragraph text="dataVaultPage.text" />

      <Input
        id="masterPassword"
        name="masterPassword"
        label={"dataVaultPage.masterPassword"}
        type="password"
        value={masterPassword}
        onChange={(e) => setMasterPassword(e.target.value)}
      />
      <SubmitButton
        className="data-vault-form__button"
        modifier="hover"
        isLoading={isDataVaultLoading}
      >
        {"dataVaultPage.submitButton"}
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
  processMasterPasswordVerification: PropTypes.func.isRequired,
  isDataVaultLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
