import { useState, useEffect, useContext } from "react";
import { ContactInteractor } from "../../../usecases/contact/ContactInteractor.js";
import { ContactRepository } from "../../repositories/ContactRepository.js";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ContactTemplate } from "../templates";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewContactForm, ContactsOverview } from "../organisms";

// Initialisierung des ContactRepository und des ContactInteractor
const contactRepository = new ContactRepository();
const contactInteractor = new ContactInteractor(contactRepository);
const cryptographyInteractor = new CryptographyInteractor();

export const ContactsPage = () => {
  const { masterPassword } = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);
  const [newContactFormValues, setNewContactFormValues] = useState({
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

  const [isContactLoading, setIsContactLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewContactFormValues({ ...newContactFormValues, [name]: value });
  };

  const decryptContactData = async (contactData, masterPassword) => {
    // Check whether the input is an array or needs to be converted into an array
    const contacts = Array.isArray(contactData) ? contactData : [contactData];

    const decryptedContacts = await Promise.all(
      contacts.map(async (contact) => {
        const decryptionResultNotes = contact.encryptedNotes
          ? await cryptographyInteractor.decryptData({
              encryptedData: contact.encryptedNotes,
              iv: contact.notesEncryptionIv,
              salt: contact.notesEncryptionSalt,
              masterPassword: masterPassword,
            })
          : { success: true, data: "" };

        const decryptedNotes = decryptionResultNotes.success
          ? decryptionResultNotes.data
          : "";

        return {
          ...contact,
          decryptedNotes,
        };
      })
    );

    return Array.isArray(contactData)
      ? decryptedContacts
      : decryptedContacts[0];
  };

  const getContacts = async (masterPassword) => {
    setIsContactLoading(true);

    const contactRequestResponse = await contactInteractor.getContacts();
    if (!contactRequestResponse.success) {
      setMessage(
        contactRequestResponse.message || "Fehler beim Abrufen der Konten"
      );
      setMessageType("error");
      setContacts([]);
      setIsContactLoading(false);
      return;
    }

    const decryptedContacts = await decryptContactData(
      contactRequestResponse.contacts,
      masterPassword
    );
    if (!decryptedContacts) {
      setMessage("Fehler beim Entschlüsseln der Konten");
      setMessageType("error");
      setContacts([]);
      return;
    }

    setIsContactLoading(false);
    setContacts(decryptedContacts);
    setMessage(contactRequestResponse.message);
    setMessageType("success");
  };

  useEffect(() => {
    getContacts(masterPassword);
  }, []);

  const handleCreateContact = async (e, masterPassword) => {
    e.preventDefault();
    setIsContactLoading(true);

    const validateContact = await contactInteractor.validateCreateContact({
      companyName: newContactFormValues.companyName,
      firstName: newContactFormValues.firstName,
      lastName: newContactFormValues.lastName,
      streetAddress: newContactFormValues.streetAddress,
      additionalAddressInfo: newContactFormValues.additionalAddressInfo,
      city: newContactFormValues.city,
      stateProvinceRegion: newContactFormValues.stateProvinceRegion,
      postalCode: newContactFormValues.postalCode,
      country: newContactFormValues.country,
      phoneNumber: newContactFormValues.phoneNumber,
      email: newContactFormValues.email,
      birthDate: newContactFormValues.birthDate,
      notes: newContactFormValues.notes,
    });
    if (validateContact && validateContact.validationError) {
      setIsContactLoading(false);
      setMessage(`validationError.${validateContact.validationError}`);
      setMessageType("error");
      return;
    }

    let encryptedNotesObj = { data: { encryptedData: "", iv: "", salt: "" } };
    if (newContactFormValues.notes) {
      encryptedNotesObj = await cryptographyInteractor.encryptData({
        text: newContactFormValues.notes,
        masterPassword: masterPassword,
      });
    }

    const creationResponse = await contactInteractor.createContact({
      companyName: newContactFormValues.companyName,
      firstName: newContactFormValues.firstName,
      lastName: newContactFormValues.lastName,
      streetAddress: newContactFormValues.streetAddress,
      additionalAddressInfo: newContactFormValues.additionalAddressInfo,
      city: newContactFormValues.city,
      stateProvinceRegion: newContactFormValues.stateProvinceRegion,
      postalCode: newContactFormValues.postalCode,
      country: newContactFormValues.country,
      phoneNumber: newContactFormValues.phoneNumber,
      email: newContactFormValues.email,
      birthDate: newContactFormValues.birthDate,
      encryptedNotes: encryptedNotesObj.data.encryptedData,
      notesEncryptionIv: encryptedNotesObj.data.iv,
      notesEncryptionSalt: encryptedNotesObj.data.salt,
    });

    if (creationResponse.validationError) {
      setIsContactLoading(false);
      setMessage(`validationError.${creationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (!creationResponse.success) {
      setIsContactLoading(false);
      setMessage(creationResponse.message);
      setMessageType("error");
      return;
    }

    const decryptedContact = await decryptContactData(
      creationResponse.contact,
      masterPassword
    );

    setContacts((prevContacts) => [...prevContacts, decryptedContact]);
    setIsContactLoading(false);
    setNewContactFormValues({
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
    setMessage(creationResponse.message);
    setMessageType("success");
  };

  const handleSelectContactForEdit = (contactId) => {
    const contact = contacts.find((acc) => acc.contactId === contactId);
    if (contact) {
      setNewContactFormValues({
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
    }
  };

  const handleEditContact = async (e, contactId, formValues) => {
    e.preventDefault();
    setIsContactLoading(true);

    const contactToUpdate = contacts.find((acc) => acc.contactId === contactId);

    if (!contactToUpdate) {
      setIsContactLoading(false);
      return;
    }

    const validateContact = await contactInteractor.validateEditContact({
      companyName: formValues.companyName,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      streetAddress: formValues.streetAddress,
      additionalAddressInfo: formValues.additionalAddressInfo,
      city: formValues.city,
      stateProvinceRegion: formValues.stateProvinceRegion,
      postalCode: formValues.postalCode,
      country: formValues.country,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      birthDate: formValues.birthDate,
      notes: formValues.notes,
    });

    if (validateContact && validateContact.validationError) {
      setIsContactLoading(false);
      setMessage(`validationError.${validateContact.validationError}`);
      setMessageType("error");
      return;
    }

    let encryptedNotesObj = { data: { encryptedData: "", iv: "", salt: "" } };
    if (formValues.notes) {
      encryptedNotesObj = await cryptographyInteractor.encryptData({
        text: formValues.notes,
        masterPassword: masterPassword,
      });
    }

    const editResponse = await contactInteractor.editContact(contactId, {
      companyName: formValues.companyName,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      streetAddress: formValues.streetAddress,
      additionalAddressInfo: formValues.additionalAddressInfo,
      city: formValues.city,
      stateProvinceRegion: formValues.stateProvinceRegion,
      postalCode: formValues.postalCode,
      country: formValues.country,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      birthDate: formValues.birthDate,
      encryptedNotes: encryptedNotesObj.data.encryptedData,
      notesEncryptionIv: encryptedNotesObj.data.iv,
      notesEncryptionSalt: encryptedNotesObj.data.salt,
    });

    if (!editResponse.success) {
      setIsContactLoading(false);
      setMessage(editResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedContact = contacts.map((contact) => {
      if (contact.contactId === contactId) {
        return {
          ...contact,
          ...formValues,
          decryptedNotes: formValues.notes,
        };
      }
      return contact;
    });

    setContacts(updatedContact);
    setIsContactLoading(false);
    setMessage(editResponse.message);
    setMessageType("success");
  };

  const handleDeleteContact = async (contactId) => {
    setIsContactLoading(true);

    const contactToDelete = contacts.find((acc) => acc.contactId === contactId);

    if (!contactToDelete) {
      setIsContactLoading(false);
      return;
    }

    const deletionResponse = await contactInteractor.deleteContact(contactId);

    if (!deletionResponse.success) {
      setIsContactLoading(false);
      setMessage(deletionResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedContacts = contacts.filter(
      (contact) => contact.contactId !== contactId
    );

    setContacts(updatedContacts);
    setIsContactLoading(false);
    setMessage(deletionResponse.message);
    setMessageType("success");
  };

  return (
    <ContactTemplate>
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="contact-page__flash-message"
      />
      <NewContactForm
        formValues={newContactFormValues}
        setFormValues={setNewContactFormValues}
        handleChange={handleChange}
        handleSubmit={(e) => handleCreateContact(e, masterPassword)}
        isContactLoading={isContactLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <ContactsOverview
        contacts={contacts}
        onSelectContact={handleSelectContactForEdit}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
        isContactLoading={isContactLoading}
        message={message}
        messageType={messageType}
      />
    </ContactTemplate>
  );
};
