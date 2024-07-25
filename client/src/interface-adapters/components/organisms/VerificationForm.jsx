import PropTypes from "prop-types";
import { Heading1, Input, Paragraph } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/verification-form.css";

export const VerificationForm = ({
  verificationFormData,
  handleChange,
  processVerification,
  processNewVerificationCodeRequest,
  isVerificationLoading,
  isCodeRequestLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <>
      <Heading1 text="verificationPage.title" />

      <form className="verification-form" onSubmit={processVerification}>
        <Input
          id="verificationCode"
          name="verificationCode"
          label="verificationPage.label"
          type="text"
          value={verificationFormData.verificationCode}
          onChange={handleChange}
        />

        <SubmitButton
          className="verification-form__button"
          modifier="hover"
          isLoading={isVerificationLoading}
        >
          {"verificationPage.submit"}
        </SubmitButton>
      </form>

      <form
        className="verification-form"
        onSubmit={processNewVerificationCodeRequest}
      >
        <Paragraph text="verificationPage.text" />

        <SubmitButton
          className="verification-form__button"
          modifier="hover"
          isLoading={isCodeRequestLoading}
        >
          {"verificationPage.newCodeButton"}
        </SubmitButton>
      </form>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
      />
    </>
  );
};

VerificationForm.propTypes = {
  verificationFormData: PropTypes.shape({
    verificationCode: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  processVerification: PropTypes.func.isRequired,
  processNewVerificationCodeRequest: PropTypes.func.isRequired,
  isVerificationLoading: PropTypes.bool.isRequired,
  isCodeRequestLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
