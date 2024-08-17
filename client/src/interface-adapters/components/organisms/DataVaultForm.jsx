import PropTypes from "prop-types";
import { Heading1, Paragraph } from "../atoms";
import { FlashMessage, HiddenInput, SubmitButton } from "../molecules";
import "./assets/data-vault-form.css";

export const DataVaultForm = ({
  masterPassword,
  setMasterPassword,
  processMasterPasswordVerification,
  isDataVaultLoading,
  inactivity,
  isTestUser,
  message,
  setMessage,
  messageType,
}) => {
  const testMasterPassword = import.meta.env.VITE_TEST_MASTER_PASSWORD;

  return (
    <form
      className="data-vault-form"
      onSubmit={processMasterPasswordVerification}
    >
      <Heading1 text="dataVaultPage.title" />

      {isTestUser ? (
        <Paragraph text={`Test Master Password: ${testMasterPassword}`} />
      ) : null}

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

      {inactivity ? <Paragraph text="dataVaultPage.inactivity" /> : null}

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
  inactivity: PropTypes.bool.isRequired,
  isTestUser: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
