import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useState } from "react";
import { Heading1, Input, Span, Button } from "../atoms";
import { SubmitButton } from "./SubmitButton";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import "./assets/contact-card.css";

export const ContactCard = ({
  contact,
  processUpdateContact,
  processDeleteContact,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedContact, setEditedContact] = useState({
    companyName: contact.companyName,
    firstName: contact.firstName,
    lastName: contact.lastName,
    streetAddress: contact.streetAddress,
    additionalAddressInfo: contact.additionalAddressInfo,
    city: contact.city,
    stateProvinceRegion: contact.stateProvinceRegion,
    postalCode: contact.postalCode,
    country: contact.country,
    phoneNumber: contact.phoneNumber,
    email: contact.email,
    birthDate: contact.birthDate,
    notes: contact.decryptedNotes,
  });

  const handleChange = (e, field) => {
    setEditedContact({ ...editedContact, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateContactFormData = {
      companyName: e.target.companyName.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      streetAddress: e.target.streetAddress.value,
      additionalAddressInfo: e.target.additionalAddressInfo.value,
      city: e.target.city.value,
      stateProvinceRegion: e.target.stateProvinceRegion.value,
      postalCode: e.target.postalCode.value,
      country: e.target.country.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value,
      birthDate: e.target.birthDate.value,
      notes: e.target.notes.value,
    };

    processUpdateContact(
      e,
      contact.contactId,
      updateContactFormData,
      setIsEditing,
    );
    setIsEditing(false);
  };

  return (
    <div className="contact-card">
      <div
        className="contact-card__title"
        onClick={() => setIsClicked(!isClicked)}
      >
        <Heading1
          text={contact.companyName || contact.firstName || contact.lastName}
        />
        {isClicked ? <SlArrowUp /> : <SlArrowDown />}
      </div>

      {isClicked && (
        <div className="contact-card--expanded">
          {isEditing ? (
            <div className="contact-card--editing">
              <form onSubmit={handleSubmit} className="contact__form">
                <Input
                  id={`companyName-${contact.contactId}`}
                  label={"contactsPage.companyName"}
                  type="text"
                  value={editedContact.companyName}
                  onChange={(e) => handleChange(e, "companyName")}
                  name="companyName"
                />
                <Input
                  id={`firstName-${contact.contactId}`}
                  label={"contactsPage.firstName"}
                  type="text"
                  value={editedContact.firstName}
                  onChange={(e) => handleChange(e, "firstName")}
                  name="firstName"
                />
                <Input
                  id={`lastName-${contact.contactId}`}
                  label={"contactsPage.lastName"}
                  type="text"
                  value={editedContact.lastName}
                  onChange={(e) => handleChange(e, "lastName")}
                  name="lastName"
                />
                <Input
                  id={`streetAddress-${contact.contactId}`}
                  label={"contactsPage.streetAddress"}
                  type="text"
                  value={editedContact.streetAddress}
                  onChange={(e) => handleChange(e, "streetAddress")}
                  name="streetAddress"
                />
                <Input
                  id={`additionalAddressInfo-${contact.contactId}`}
                  label={"contactsPage.additionalAddressInfo"}
                  type="text"
                  value={editedContact.additionalAddressInfo}
                  onChange={(e) => handleChange(e, "additionalAddressInfo")}
                  name="additionalAddressInfo"
                />
                <Input
                  id={`city-${contact.contactId}`}
                  label={"contactsPage.city"}
                  type="text"
                  value={editedContact.city}
                  onChange={(e) => handleChange(e, "city")}
                  name="city"
                />
                <Input
                  id={`stateProvinceRegion-${contact.contactId}`}
                  label={"contactsPage.stateProvinceRegion"}
                  type="text"
                  value={editedContact.stateProvinceRegion}
                  onChange={(e) => handleChange(e, "stateProvinceRegion")}
                  name="stateProvinceRegion"
                />
                <Input
                  id={`postalCode-${contact.contactId}`}
                  label={"contactsPage.postalCode"}
                  type="text"
                  value={editedContact.postalCode}
                  onChange={(e) => handleChange(e, "postalCode")}
                  name="postalCode"
                />
                <Input
                  id={`country-${contact.contactId}`}
                  label={"contactsPage.country"}
                  type="text"
                  value={editedContact.country}
                  onChange={(e) => handleChange(e, "country")}
                  name="country"
                />
                <Input
                  id={`phoneNumber-${contact.contactId}`}
                  label={"contactsPage.phoneNumber"}
                  type="text"
                  value={editedContact.phoneNumber}
                  onChange={(e) => handleChange(e, "phoneNumber")}
                  name="phoneNumber"
                />
                <Input
                  id={`email-${contact.contactId}`}
                  label={"contactsPage.email"}
                  type="text"
                  value={editedContact.email}
                  onChange={(e) => handleChange(e, "email")}
                  name="email"
                />
                <Input
                  id={`birthDate-${contact.contactId}`}
                  label={"contactsPage.birthDate"}
                  type="text"
                  value={editedContact.birthDate}
                  onChange={(e) => handleChange(e, "birthDate")}
                  name="birthDate"
                />

                <Input
                  id={`notes-${contact.contactId}`}
                  label={"contactsPage.notes"}
                  type="text"
                  value={editedContact.notes}
                  onChange={(e) => handleChange(e, "notes")}
                  name="notes"
                />
                <div className="contact-card__button-wrapper">
                  <SubmitButton isLoading={isLoading}>
                    {"contactsPage.submitEdit"}
                  </SubmitButton>
                  <Button onClick={() => setIsEditing(false)}>
                    {"contactsPage.cancel"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="contact-card--overview">
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.companyName")}:</strong>{" "}
                <Span text={contact.companyName} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.firstName")}:</strong>{" "}
                <Span text={contact.firstName} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.lastName")}:</strong>{" "}
                <Span text={contact.lastName} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.streetAddress")}:</strong>{" "}
                <Span text={contact.streetAddress} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.additionalAddressInfo")}:</strong>{" "}
                <Span text={contact.additionalAddressInfo} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.city")}:</strong>{" "}
                <Span text={contact.city} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.stateProvinceRegion")}:</strong>{" "}
                <Span text={contact.stateProvinceRegion} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.postalCode")}:</strong>{" "}
                <Span text={contact.postalCode} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.country")}:</strong>{" "}
                <Span text={contact.country} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.phoneNumber")}:</strong>{" "}
                <Span text={contact.phoneNumber} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.email")}:</strong>{" "}
                <Span text={contact.email} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.birthDate")}:</strong>{" "}
                <Span text={contact.birthDate} />
              </div>
              <div className="contact-card__info-container">
                <strong>{t("contactsPage.notes")}:</strong>{" "}
                <Span text={contact.decryptedNotes} />
              </div>
              {isDeleting ? (
                <div className="contact-card__button-wrapper">
                  <Button
                    type="button"
                    onClick={() => {
                      processDeleteContact(contact.contactId),
                        setIsDeleting(false);
                    }}
                  >
                    {"contactsPage.submitDelete"}
                  </Button>
                  <Button onClick={() => setIsDeleting(false)}>
                    {"contactsPage.cancel"}
                  </Button>
                </div>
              ) : (
                <div className="contact-card__button-wrapper">
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    {"contactsPage.edit"}
                  </Button>
                  <Button onClick={() => setIsDeleting(true)}>
                    {"contactsPage.delete"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    contactId: PropTypes.number.isRequired,
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
    decryptedNotes: PropTypes.string,
  }).isRequired,
  handleSelectContactForEdit: PropTypes.func.isRequired,
  processUpdateContact: PropTypes.func.isRequired,
  processDeleteContact: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
