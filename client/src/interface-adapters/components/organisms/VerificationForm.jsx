import PropTypes from "prop-types";
import { Input, Paragraph } from "../atoms";
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
      <form className="verification-form" onSubmit={processVerification}>
        <Input
          id="verificationCode"
          name="verificationCode"
          label="verification.label"
          type="text"
          value={verificationFormData.verificationCode}
          onChange={handleChange}
        />
        <SubmitButton
          className="verification-form__button"
          modifier="hover"
          isLoading={isVerificationLoading}
        >
          {"verification.submit"}
        </SubmitButton>
      </form>
      <form
        className="verification-form"
        onSubmit={processNewVerificationCodeRequest}
      >
        <Paragraph text="verification.text" />
        <SubmitButton
          className="verification-form__button"
          modifier="hover"
          isLoading={isCodeRequestLoading}
        >
          {"verification.newCodeButton"}
        </SubmitButton>
        <FlashMessage
          message={message}
          setMessage={setMessage}
          type={messageType}
          className="verification-form__flash-message"
        />
      </form>
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
