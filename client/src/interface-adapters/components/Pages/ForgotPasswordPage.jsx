import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/user/UserInteractor";
import { UserRepository } from "../../repositories/UserRepository";

import { AuthContext } from "../../context/AuthContext";
import { AuthTemplate } from "../templates";
import { ForgotPasswordForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

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
    setIsPasswordRequestLoading(true);

    const passwordRequestResponse = await userInteractor.requestNewPassword({
      email,
    });
    if (passwordRequestResponse.validationError) {
      setIsPasswordRequestLoading(false);
      setMessage(`validationError.${passwordRequestResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
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
    <AuthTemplate>
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
        handleNewPasswordRequest={handleNewPasswordRequest}
        isPasswordRequestLoading={isPasswordRequestLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
