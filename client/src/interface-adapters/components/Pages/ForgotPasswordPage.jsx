import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import { ForgotPasswordTemplate } from "../templates";
import { ForgotPasswordForm } from "../organisms";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { userInteractor, isAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isPasswordRequestLoading, setIsPasswordRequestLoading] =
    useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const handleNewPasswordRequest = async (e) => {
    e.preventDefault();
    if (email === "test@test.com") {
      setMessage("Test user can't request a new password!");
      setMessageType("error");
      return;
    }

    setIsPasswordRequestLoading(true);

    const passwordRequestResponse = await userInteractor.requestNewPassword({
      email,
    });
    if (
      !passwordRequestResponse.success &&
      passwordRequestResponse.message === "Failed to fetch"
    ) {
      setIsPasswordRequestLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!passwordRequestResponse.success) {
      setIsPasswordRequestLoading(false);
      setMessage(passwordRequestResponse.message);
      setMessageType("error");
      return;
    }

    setEmail("");
    setIsPasswordRequestLoading(false);
    setMessage(passwordRequestResponse.message);
    setMessageType("success");
  };

  return (
    <ForgotPasswordTemplate>
      <section
        id="forgot-password"
        className="forgot-password-template__section"
      >
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          handleNewPasswordRequest={handleNewPasswordRequest}
          isPasswordRequestLoading={isPasswordRequestLoading}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      </section>
    </ForgotPasswordTemplate>
  );
};
