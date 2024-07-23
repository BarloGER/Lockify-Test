import PropTypes from "prop-types";
import { Heading1 } from "../atoms";
import { FlashMessage, HiddenInput, SubmitButton } from "../molecules";
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
    <form
      className="data-vault-form"
      onSubmit={processMasterPasswordVerification}
    >
      <Heading1 text="dataVaultPage.title" />

      <HiddenInput
        id="masterPassword"
        name="masterPassword"
        label={"dataVaultPage.masterPassword"}
        autocomplete="false"
        value={masterPassword}
        onChange={(e) => setMasterPassword(e.target.value)}
      />

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
      />

      <SubmitButton
        className="data-vault-form__submit-button"
        modifier="hover"
        isLoading={isDataVaultLoading}
      >
        {"dataVaultPage.submitButton"}
      </SubmitButton>
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
