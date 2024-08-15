import PropTypes from "prop-types";
import { ContactCard } from "../molecules";
import "./assets/contacts-overview.css";

export const ContactsOverview = ({
  contacts,
  handleSelectContactForEdit,
  processUpdateContact,
  processDeleteContact,
  isContactLoading,
}) => {
  return (
    <ul className="contacts-overview">
      {contacts.map((contact, index) => (
        <li key={contact.contactId || index}>
          <ContactCard
            contact={contact}
            handleSelectContactForEdit={() =>
              handleSelectContactForEdit(contact.contactId)
            }
            processUpdateContact={processUpdateContact}
            processDeleteContact={processDeleteContact}
            isLoading={isContactLoading}
          />
        </li>
      ))}
    </ul>
  );
};

ContactsOverview.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
  handleSelectContactForEdit: PropTypes.func.isRequired,
  processUpdateContact: PropTypes.func.isRequired,
  processDeleteContact: PropTypes.func.isRequired,
  isContactLoading: PropTypes.bool,
};
