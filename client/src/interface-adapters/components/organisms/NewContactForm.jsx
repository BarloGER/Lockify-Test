import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/new-contact-form.css";

export const NewContactForm = ({
  formValues,
  setFormValues,
  handleChange,
  handleSubmit,
  isContactLoading,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setFormValues({
      companyName: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      additionalAddressInfo: "",
      city: "",
      stateProvinceRegion: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
      email: "",
      birthDate: "",
      notes: "",
    });
  };

  return (
    <div className={`new-contact__form ${isCreating ? "creating" : ""}`}>
      <div className="new-contact__form_inner">
        <div className="new-contact__form_front">
          <div className="plus-container" onClick={handlePlusClick}>
            <span className="plus">+</span>
          </div>
        </div>
        <div className="new-contact__form_back">
          <form onSubmit={handleSubmit}>
            <Input
              id="companyName"
              name="companyName"
              label={t("contact.companyName")}
              value={formValues.companyName}
              onChange={handleChange}
            />
            <Input
              id="firstName"
              name="firstName"
              label={t("contact.firstName")}
              value={formValues.firstName}
              onChange={handleChange}
            />
            <Input
              id="lastName"
              name="lastName"
              label={t("contact.lastName")}
              value={formValues.lastName}
              onChange={handleChange}
            />
            <Input
              id="streetAddress"
              name="streetAddress"
              label={t("contact.streetAddress")}
              type="streetAddress"
              value={formValues.streetAddress}
              onChange={handleChange}
            />
            <Input
              id="additionalAddressInfo"
              name="additionalAddressInfo"
              label={t("contact.additionalAddressInfo")}
              type="additionalAddressInfo"
              value={formValues.additionalAddressInfo}
              onChange={handleChange}
            />
            <Input
              id="city"
              name="city"
              label={t("contact.city")}
              type="city"
              value={formValues.city}
              onChange={handleChange}
            />
            <Input
              id="stateProvinceRegion"
              name="stateProvinceRegion"
              label={t("contact.stateProvinceRegion")}
              type="stateProvinceRegion"
              value={formValues.stateProvinceRegion}
              onChange={handleChange}
            />
            <Input
              id="postalCode"
              name="postalCode"
              label={t("contact.postalCode")}
              type="postalCode"
              value={formValues.postalCode}
              onChange={handleChange}
            />
            <Input
              id="country"
              name="country"
              label={t("contact.country")}
              type="country"
              value={formValues.country}
              onChange={handleChange}
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              label={t("contact.phoneNumber")}
              type="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              label={t("contact.email")}
              type="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <Input
              id="birthDate"
              name="birthDate"
              label={t("contact.birthDate")}
              type="birthDate"
              value={formValues.birthDate}
              onChange={handleChange}
            />
            <Input
              id="notes"
              name="notes"
              label={t("contact.notes")}
              value={formValues.notes}
              onChange={handleChange}
            />

            <SubmitButton
              className="contact-form__button"
              modifier="hover"
              isLoading={isContactLoading}
            >
              {t("contact.submitNewContact")}
            </SubmitButton>

            <Button onClick={handlePlusClick} modifier="hover">
              {t("contact.cancel")}
            </Button>

            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="contact-form__flash-message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

NewContactForm.propTypes = {
  formValues: PropTypes.shape({
    companyName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    streetAddress: PropTypes.string,
    additionalAddressInfo: PropTypes.string,
    city: PropTypes.string,
    stateProvinceRegion: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  setFormValues: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isContactLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
