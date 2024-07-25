import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserProfileTemplate } from "../templates";
import { UserProfileForm } from "../organisms";
import { Settings } from "../organisms";

export const UserProfilePage = () => {
  const { user, setUser, userInteractor, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [updateUserFormData, setUpdateUserFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    password: "",
    confirmPassword: "",
    isNewsletterAllowed: user ? user.isNewsletterAllowed : false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isAuthenticated || (user && !user.isVerified)) {
    return;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateUserFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const processUpdateUser = async (e) => {
    // ! Add masterPassword
    e.preventDefault();
    setIsUserLoading(true);

    const dataToUpdate = Object.keys(updateUserFormData).reduce((acc, key) => {
      if (key === "password" && updateUserFormData[key] === "") return acc; // Skip empty password
      if (
        updateUserFormData[key] !== user[key] &&
        (updateUserFormData[key] ||
          typeof updateUserFormData[key] === "boolean")
      ) {
        acc[key] = updateUserFormData[key];
      }
      return acc;
    }, {});

    // const unvalidatedUserInput = dataToUpdate;
    // const validateUserInput =
    //   await userInteractor.validateUserInputForUpdaterUser(
    //     unvalidatedUserInput
    //   );
    // if (!validateUserInput.success) {
    //   setIsUserLoading(false);
    //   setMessage(`validationError.${validateUserInput.message}`);
    //   setMessageType("error");
    //   return;
    // }
    // const validUserEntity = validateUserInput.validUserEntity;

    const updateResponse = await userInteractor.updateUser(dataToUpdate);
    if (updateResponse.validationError) {
      setIsUserLoading(false);
      setMessage(`validationError.${updateResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
      !updateResponse.success &&
      updateResponse.message === "Failed to fetch"
    ) {
      setIsUserLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
    } else if (!updateResponse.success) {
      setIsUserLoading(false);
      setMessage(updateResponse.message);
      setMessageType("error");
      setUpdateUserFormData({
        username: user.username,
        email: user.email,
        password: "",
        confirmPassword: "",
        isNewsletterAllowed: user.isNewsletterAllowed,
      });
      return;
    }

    setUser({ ...user, ...dataToUpdate });
    setIsUserLoading(false);
    setMessage(updateResponse.message);
    setMessageType("success");
  };

  const processDeleteUser = async () => {
    setIsUserLoading(true);

    const deletionResponse = await userInteractor.deleteUser();
    if (
      !deletionResponse.success &&
      deletionResponse.message === "Failed to fetch"
    ) {
      setIsUserLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
    } else if (!deletionResponse.success) {
      setIsUserLoading(false);
      setMessage(deletionResponse.message);
      setMessageType("error");
      return;
    }

    setIsAuthenticated(false);
  };

  return (
    <UserProfileTemplate>
      <section className="user-profile-template__section">
        <UserProfileForm
          updateUserFormData={updateUserFormData}
          setUpdateUserFormData={setUpdateUserFormData}
          isUserLoading={isUserLoading}
          handleChange={handleChange}
          processUpdateUser={processUpdateUser}
          processDeleteUser={processDeleteUser}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      </section>
      <section className="user-profile-template__section">
        <Settings />
      </section>
    </UserProfileTemplate>
  );
};
