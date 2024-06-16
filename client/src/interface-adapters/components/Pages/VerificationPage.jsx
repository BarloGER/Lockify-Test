import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/UserInteractor.js";
import { UserRepository } from "../../repositories/UserRepository.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import { AuthTemplate } from "../templates";
import { VerificationForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const VerificationPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  console.log("VerificationPage", user);

  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (isAuthenticated && user.isVerified) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleVerification = async (e) => {
    e.preventDefault();

    const verify = await userInteractor.verify({
      verificationCode,
    });
    console.log(verify);
    if (!verify.success && verify.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!verify.success) {
      setMessage(verify.message);
      setMessageType("error");
      return;
    }

    setMessage(verify.message);
    setMessageType("success");
  };

  const sendNewCode = async () => {
    const email = user.email;
    const sendMail = await userInteractor.sendNewCode({ email });

    if (!sendMail.success && sendMail.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!sendMail.success) {
      setMessage(sendMail.message);
      setMessageType("error");
      return;
    }

    setMessage(sendMail.message);
    setMessageType("success");
  };

  return (
    <AuthTemplate>
      <VerificationForm
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleVerification={handleVerification}
        sendNewCode={sendNewCode}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
