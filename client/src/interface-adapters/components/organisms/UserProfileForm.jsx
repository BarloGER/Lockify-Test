import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { Input, Button } from "../atoms";
import { Checkbox, FlashMessage, SubmitButton } from "../molecules";

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
  const { changeDesign } = useContext(DesignContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCheckboxChange = (e) => {
    setUpdateUserFormData((prevState) => ({
      ...prevState,
      isNewsletterAllowed: e.target.checked,
    }));
  };

  return (
    <>
      <form onSubmit={processUpdateUser}>
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
        <Input
          id="password"
          name="password"
          label="userProfilePage.password"
          type="password"
          value={updateUserFormData.password}
          onChange={handleChange}
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="userProfilePage.confirmPassword"
          type="password"
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
            <Button
              type="button"
              onClick={() => {
                processDeleteUser(), setIsDeleting(false);
              }}
            >
              {"userProfilePage.submitDelete"}
            </Button>
            <Button onClick={() => setIsDeleting(false)}>
              {"userProfilePage.cancel"}
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
          className="user-profile-form__flash-message"
        />
      </form>

      <div>
        <label>Design wählen:</label>
        <button type="button" onClick={() => changeDesign("design1")}>
          Design 1
        </button>
        <button type="button" onClick={() => changeDesign("design2")}>
          Design 2
        </button>
        <button type="button" onClick={() => changeDesign("design3")}>
          Design 3
        </button>
      </div>
    </>
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
