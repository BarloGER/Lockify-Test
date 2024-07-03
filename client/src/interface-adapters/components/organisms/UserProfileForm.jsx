import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input, Button } from "../atoms";
import { Checkbox, FlashMessage, SubmitButton } from "../molecules";

export const UserProfileForm = ({
  formData,
  setFormData,
  isUserLoading,
  handleChange,
  handleSubmit,
  handleDeleteUser,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCheckboxChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      isNewsletterAllowed: e.target.checked,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="username"
        name="username"
        label={t("userProfile.username")}
        type="text"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        id="email"
        name="email"
        label={t("userProfile.email")}
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        id="password"
        name="password"
        label={t("userProfile.password")}
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        label={t("userProfile.confirmPassword")}
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <Checkbox
        id="newsletter"
        name="newsletter"
        label={t("userProfile.newsletter")}
        checked={formData.isNewsletterAllowed}
        onChange={handleCheckboxChange}
      />
      <SubmitButton isLoading={isUserLoading}>
        {t("userProfile.submit")}
      </SubmitButton>
      {isDeleting ? (
        <>
          <Button
            type="button"
            onClick={() => {
              handleDeleteUser(), setIsDeleting(false);
            }}
          >
            {t("userProfile.submitDelete")}
          </Button>
          <Button onClick={() => setIsDeleting(false)}>
            {t("userProfile.cancel")}
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => setIsDeleting(true)}>
            {t("userProfile.delete")}
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
  );
};

UserProfileForm.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    isNewsletterAllowed: PropTypes.bool,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
