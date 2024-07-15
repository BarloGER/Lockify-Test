import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";

import { AuthTemplate } from "../templates/index.js";
import { AuthenticationForm } from "../organisms/index.js";

export const AuthenticationPage = () => {
  const navigate = useNavigate();
  const { setUser, isAuthenticated, setIsAuthenticated, userInteractor } =
    useContext(AuthContext);

  const [authenticationFormData, setAuthenticationFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isAuthenticationLoading, setIsAuthenticationLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthenticationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const processAuthentication = async (e) => {
    e.preventDefault();
    setIsAuthenticationLoading(true);

    const authenticationResponse = await userInteractor.authenticateUser(
      authenticationFormData
    );
    if (authenticationResponse.validationError) {
      setIsAuthenticationLoading(false);
      setMessage(`${authenticationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
      !authenticationResponse.success &&
      authenticationResponse.message === "Failed to fetch"
    ) {
      setIsAuthenticationLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!authenticationResponse.success) {
      setIsAuthenticationLoading(false);
      setMessage(authenticationResponse.message);
      setMessageType("error");
      return;
    }

    setUser(authenticationResponse.user);
    setIsAuthenticated(true);
    setIsAuthenticationLoading(false);
    setMessage(authenticationResponse.message);
    setMessageType("success");
    navigate("/");
  };

  return (
    <AuthTemplate>
      <AuthenticationForm
        authenticationFormData={authenticationFormData}
        handleChange={handleChange}
        processAuthentication={processAuthentication}
        isAuthenticationLoading={isAuthenticationLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
