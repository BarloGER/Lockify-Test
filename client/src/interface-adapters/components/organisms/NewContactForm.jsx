import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/new-contact-form.css";

export const NewContactForm = ({
  newContactFormData,
  setNewContactFormData,
  handleChange,
  processCreateContact,
  isContactLoading,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setNewContactFormData({
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
    <div className="new-contact-form">
      {isCreating ? (
        <div className="new-contact-form__inner">
          <form onSubmit={processCreateContact}>
            <Input
              id="companyName"
              name="companyName"
              label={t("contactsPage.companyName")}
              value={newContactFormData.companyName}
              onChange={handleChange}
            />
            <Input
              id="firstName"
              name="firstName"
              label={t("contactsPage.firstName")}
              value={newContactFormData.firstName}
              onChange={handleChange}
            />
            <Input
              id="lastName"
              name="lastName"
              label={t("contactsPage.lastName")}
              value={newContactFormData.lastName}
              onChange={handleChange}
            />
            <Input
              id="streetAddress"
              name="streetAddress"
              label={t("contactsPage.streetAddress")}
              type="streetAddress"
              value={newContactFormData.streetAddress}
              onChange={handleChange}
            />
            <Input
              id="additionalAddressInfo"
              name="additionalAddressInfo"
              label={t("contactsPage.additionalAddressInfo")}
              type="additionalAddressInfo"
              value={newContactFormData.additionalAddressInfo}
              onChange={handleChange}
            />
            <Input
              id="city"
              name="city"
              label={t("contactsPage.city")}
              type="city"
              value={newContactFormData.city}
              onChange={handleChange}
            />
            <Input
              id="stateProvinceRegion"
              name="stateProvinceRegion"
              label={t("contactsPage.stateProvinceRegion")}
              type="stateProvinceRegion"
              value={newContactFormData.stateProvinceRegion}
              onChange={handleChange}
            />
            <Input
              id="postalCode"
              name="postalCode"
              label={t("contactsPage.postalCode")}
              type="postalCode"
              value={newContactFormData.postalCode}
              onChange={handleChange}
            />
            <Input
              id="country"
              name="country"
              label={t("contactsPage.country")}
              type="country"
              value={newContactFormData.country}
              onChange={handleChange}
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              label={t("contactsPage.phoneNumber")}
              type="phoneNumber"
              value={newContactFormData.phoneNumber}
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              label={t("contactsPage.email")}
              type="email"
              value={newContactFormData.email}
              onChange={handleChange}
            />
            <Input
              id="birthDate"
              name="birthDate"
              label={t("contactsPage.birthDate")}
              type="birthDate"
              value={newContactFormData.birthDate}
              onChange={handleChange}
            />
            <Input
              id="notes"
              name="notes"
              label={t("contactsPage.notes")}
              value={newContactFormData.notes}
              onChange={handleChange}
            />

            <div className="new-contact-form__button-wrapper">
              <SubmitButton
                className="new-contact-form__button"
                modifier="hover"
                isLoading={isContactLoading}
              >
                {t("contactsPage.submitNewContact")}
              </SubmitButton>

              <Button onClick={handlePlusClick} modifier="hover">
                {t("contactsPage.cancel")}
              </Button>
            </div>
            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="new-contact-form__flash-message"
            />
          </form>
        </div>
      ) : (
        <div
          className="new-contact-form__inner"
          onClick={() => setIsCreating(!isCreating)}
        >
          <span className="plus">+</span>
        </div>
      )}
    </div>
  );
};

NewContactForm.propTypes = {
  newContactFormData: PropTypes.shape({
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
  setNewContactFormData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  processCreateContact: PropTypes.func.isRequired,
  isContactLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
