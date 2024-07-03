import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/user/UserInteractor.js";
import { UserRepository } from "../../repositories/UserRepository.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import { AuthTemplate } from "../templates";
import { VerificationForm } from "../organisms";

// ? Add alternativ email

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const VerificationPage = () => {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated } = useContext(AuthContext);

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [isCodeRequestLoading, setIsCodeRequestLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated && user.isVerified) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsVerificationLoading(true);

    const verificationResponse = await userInteractor.confirmEmailAddress({
      verificationCode,
    });
    if (verificationResponse.validationError) {
      setIsVerificationLoading(false);
      setMessage(`validationError.${verificationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
      !verificationResponse.success &&
      verificationResponse.message === "Failed to fetch"
    ) {
      setIsVerificationLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!verificationResponse.success) {
      setIsVerificationLoading(false);
      setMessage(verificationResponse.message);
      setMessageType("error");
      return;
    }

    setIsVerificationLoading(false);
    setMessage(verificationResponse.message);
    setMessageType("success");
    setUser((prevUser) => ({ ...prevUser, isVerified: true }));
  };

  const handleNewVerificationCodeRequest = async (e) => {
    e.preventDefault();
    setIsCodeRequestLoading(true);

    const email = user.email;
    const codeRequestResponse = await userInteractor.requestNewVerificationCode(
      { email }
    );

    if (codeRequestResponse.validationError) {
      setIsCodeRequestLoading(false);
      setMessage(`validationError.${codeRequestResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
      !codeRequestResponse.success &&
      codeRequestResponse.message === "Failed to fetch"
    ) {
      setIsCodeRequestLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!codeRequestResponse.success) {
      setIsCodeRequestLoading(false);
      setMessage(codeRequestResponse.message);
      setMessageType("error");
      return;
    }

    setIsCodeRequestLoading(false);
    setMessage(codeRequestResponse.message);
    setMessageType("success");
  };

  return (
    <AuthTemplate>
      <VerificationForm
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleVerification={handleVerification}
        handleNewVerificationCodeRequest={handleNewVerificationCodeRequest}
        isVerificationLoading={isVerificationLoading}
        isCodeRequestLoading={isCodeRequestLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
