import PropTypes from "prop-types";
import { useState } from "react";
import { Heading1, Input, Button } from "../atoms";
import {
  Checkbox,
  FlashMessage,
  HiddenInput,
  SubmitButton,
} from "../molecules";
import "./assets/user-profile-form.css";

export const UserProfileForm = ({
  updateUserFormData,
  setUpdateUserFormData,
  isUserLoading,
  handleChange,
  processUpdateUser,
  processDeleteUser,
  message,
  setMessage,
  messageType,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCheckboxChange = (e) => {
    setUpdateUserFormData((prevState) => ({
      ...prevState,
      isNewsletterAllowed: e.target.checked,
    }));
  };

  return (
    <form className="user-profile-form" onSubmit={processUpdateUser}>
      <Heading1 text="userProfilePage.title" />

      <Input
        id="username"
        name="username"
        label="userProfilePage.username"
        type="text"
        value={updateUserFormData.username}
        onChange={handleChange}
      />

      <Input
        id="email"
        name="email"
        label="userProfilePage.email"
        type="email"
        value={updateUserFormData.email}
        onChange={handleChange}
      />

      <HiddenInput
        id="password"
        name="password"
        label="userProfilePage.password"
        autocomplete="false"
        value={updateUserFormData.password}
        onChange={handleChange}
      />

      <HiddenInput
        id="confirmPassword"
        name="confirmPassword"
        label="userProfilePage.confirmPassword"
        autocomplete="false"
        value={updateUserFormData.confirmPassword}
        onChange={handleChange}
      />

      <Checkbox
        id="newsletter"
        name="newsletter"
        label="userProfilePage.newsletter"
        checked={updateUserFormData.isNewsletterAllowed}
        onChange={handleCheckboxChange}
      />

      <SubmitButton isLoading={isUserLoading}>
        {"userProfilePage.submit"}
      </SubmitButton>
      {isDeleting ? (
        <>
          <Button onClick={() => setIsDeleting(false)}>
            {"userProfilePage.cancel"}
          </Button>
          <Button
            type="button"
            onClick={() => {
              processDeleteUser(), setIsDeleting(false);
            }}
          >
            {"userProfilePage.submitDelete"}
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => setIsDeleting(true)}>
            {"userProfilePage.delete"}
          </Button>
        </>
      )}
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
      />
    </form>
  );
};

UserProfileForm.propTypes = {
  updateUserFormData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    // masterPassword: PropTypes.string,
    // confirmMasterPassword: PropTypes.string,
    isNewsletterAllowed: PropTypes.bool,
  }).isRequired,
  setUpdateUserFormData: PropTypes.func.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  processUpdateUser: PropTypes.func.isRequired,
  processDeleteUser: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
