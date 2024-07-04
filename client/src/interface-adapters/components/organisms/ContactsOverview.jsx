import PropTypes from "prop-types";
import { ContactCard } from "../molecules";
import "./assets/contacts-overview.css";

export const ContactsOverview = ({
  contacts,
  onSelectContact,
  onEditContact,
  onDeleteContact,
  isContactLoading,
}) => {
  return (
    <section className="contacts-overview">
      {contacts.map((contact, index) => (
        <ContactCard
          key={contact.contactId || index}
          contact={contact}
          onSelect={() => onSelectContact(contact.contactId)}
          onEdit={onEditContact}
          onDelete={onDeleteContact}
          isLoading={isContactLoading}
        />
      ))}
    </section>
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
    })
  ).isRequired,
  onSelectContact: PropTypes.func.isRequired,
  onEditContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  isContactLoading: PropTypes.bool,
};
