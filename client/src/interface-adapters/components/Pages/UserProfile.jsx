import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import { UserProfileForm } from "../organisms";

export const UserProfile = () => {
  const { user, setUser, userInteractor, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isNewsletterAllowed: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
        confirmPassword: "",
        isNewsletterAllowed: user.isNewsletterAllowed,
      });
    }
  }, [user, navigate]);

  if (!isAuthenticated) {
    return;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToUpdate = Object.keys(formData).reduce((acc, key) => {
      if (key === "password" && formData[key] === "") return acc; // Skip empty password
      if (
        formData[key] !== user[key] &&
        (formData[key] || typeof formData[key] === "boolean")
      ) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    setIsUserLoading(true);
    const updateResponse = await userInteractor.editUser(dataToUpdate);
    setIsUserLoading(false);

    if (updateResponse.validationError) {
      setMessage(`validationError.${updateResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (!updateResponse.success) {
      setMessage(updateResponse.message);
      setMessageType("error");
      return;
    }

    setUser({ ...user, ...dataToUpdate });
    setMessage(updateResponse.message);
    setMessageType("success");
  };

  const handleDeleteUser = async () => {
    setIsUserLoading(true);

    const deletionResponse = await userInteractor.deleteUser();

    if (!deletionResponse.success) {
      setIsUserLoading(false);
      setMessage(deletionResponse.message);
      setMessageType("error");
      return;
    }

    setIsAuthenticated(false);
  };

  return (
    <UserProfileForm
      formData={formData}
      setFormData={setFormData}
      isUserLoading={isUserLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleDeleteUser={handleDeleteUser}
      message={message}
      setMessage={setMessage}
      messageType={messageType}
    />
  );
};
