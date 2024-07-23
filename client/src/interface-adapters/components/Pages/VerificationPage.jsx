import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";

import { VerificationTemplate } from "../templates";
import { VerificationForm } from "../organisms";

// ? Add alternativ email

export const VerificationPage = () => {
  const navigate = useNavigate();
  const { user, setUser, userInteractor, isAuthenticated } =
    useContext(AuthContext);

  const [verificationFormData, setVerificationFormData] = useState({
    verificationCode: "",
  });
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [isCodeRequestLoading, setIsCodeRequestLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated && user.isVerified) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const processVerification = async (e) => {
    e.preventDefault();
    setIsVerificationLoading(true);

    const verificationResponse = await userInteractor.confirmEmailAddress(
      verificationFormData
    );
    if (
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

    setUser((prevUser) => ({ ...prevUser, isVerified: true }));
    setIsVerificationLoading(false);
    setMessage(verificationResponse.message);
    setMessageType("success");
  };

  const processNewVerificationCodeRequest = async (e) => {
    e.preventDefault();
    setIsCodeRequestLoading(true);

    const email = user.email;
    const codeRequestResponse = await userInteractor.requestNewVerificationCode(
      { email }
    );
    if (
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
    <VerificationTemplate>
      <section className="verification-template__section">
        <VerificationForm
          verificationFormData={verificationFormData}
          handleChange={handleChange}
          processVerification={processVerification}
          processNewVerificationCodeRequest={processNewVerificationCodeRequest}
          isVerificationLoading={isVerificationLoading}
          isCodeRequestLoading={isCodeRequestLoading}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      </section>
    </VerificationTemplate>
  );
};
