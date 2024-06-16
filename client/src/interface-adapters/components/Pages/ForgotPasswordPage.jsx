import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/UserInteractor";
import { UserRepository } from "../../repositories/UserRepository";

import { AuthContext } from "../../context/AuthContext";
import { AuthTemplate } from "../templates";
import { ForgotPasswordForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendMail = await userInteractor.sendNewPassword({ email });
    if (!sendMail.success && sendMail.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!sendMail.success) {
      setMessage(sendMail.message);
      setMessageType("error");
      return;
    }

    setEmail("");
    setMessage(sendMail.message);
    setMessageType("success");
  };

  return (
    <AuthTemplate>
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
