import { useState, useContext } from "react";
import { DataVaultContext } from "../../context/DataVaultContext.jsx";
import { ContactTemplate } from "../templates";
import { SearchInput } from "../atoms";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewContactForm, ContactsOverview } from "../organisms";

export const ContactsPage = () => {
  const {
    masterPassword,
    contacts,
    setContacts,
    contactInteractor,
    cryptographyInteractor,
    isDataVaultUnlocked,
  } = useContext(DataVaultContext);

  const [newContactFormData, setNewContactFormData] = useState({
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("firstName");
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isDataVaultUnlocked) {
    return;
  }

  const searchOptions = [
    { value: "companyName" },
    { value: "firstName" },
    { value: "lastName" },
    { value: "streetAddress" },
    { value: "additionalAddressInfo" },
    { value: "city" },
    { value: "stateProvinceRegion" },
    { value: "postalCode" },
    { value: "country" },
    { value: "phoneNumber" },
    { value: "email" },
    { value: "birthDate" },
  ];
  const filteredContacts = contacts.filter((contact) =>
    contact[selectedOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewContactFormData({ ...newContactFormData, [name]: value });
  };

  const processCreateContact = async (e, masterPassword) => {
    e.preventDefault();
    setIsContactLoading(true);

    const unvalidatedUserInput = newContactFormData;
    const validateUserInput =
      await contactInteractor.validateUserInputForCreateContact(
        unvalidatedUserInput
      );
    if (!validateUserInput.success) {
      setIsContactLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validContactEntity = validateUserInput.validContactEntity;

    let encryptedNotes = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validContactEntity.notes) {
      encryptedNotes = await cryptographyInteractor.encryptData({
        text: validContactEntity.notes,
        masterPassword: masterPassword,
      });
    }

    const encryptedContactData = {
      companyName: validContactEntity.companyName,
      firstName: validContactEntity.firstName,
      lastName: validContactEntity.lastName,
      streetAddress: validContactEntity.streetAddress,
      additionalAddressInfo: validContactEntity.additionalAddressInfo,
      city: validContactEntity.city,
      stateProvinceRegion: validContactEntity.stateProvinceRegion,
      postalCode: validContactEntity.postalCode,
      country: validContactEntity.country,
      phoneNumber: validContactEntity.phoneNumber,
      email: validContactEntity.email,
      birthDate: validContactEntity.birthDate,
      encryptedNotes: encryptedNotes.encryptedData,
      notesEncryptionIv: encryptedNotes.iv,
      notesEncryptionSalt: encryptedNotes.salt,
    };

    const createContactResponse = await contactInteractor.createContact(
      encryptedContactData
    );
    if (
      !createContactResponse.success &&
      createContactResponse.message === "Failed to fetch"
    ) {
      setIsContactLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!createContactResponse.success) {
      setIsContactLoading(false);
      setMessage(createContactResponse.message);
      setMessageType("error");
      return;
    }

    setContacts((prevContacts) => [
      ...prevContacts,
      {
        ...createContactResponse.contact,
        decryptedNotes: validContactEntity.notes,
      },
    ]);
    setIsContactLoading(false);
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
    setMessage(createContactResponse.message);
    setMessageType("success");
  };

  const handleSelectContactForEdit = (contactId) => {
    const contact = contacts.find((acc) => acc.contactId === contactId);
    if (contact) {
      setNewContactFormData({
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

  const processUpdateContact = async (
    e,
    contactId,
    updateContactFormData,
    setIsEditing
  ) => {
    e.preventDefault();
    setIsContactLoading(true);

    const contactToUpdate = contacts.find((acc) => acc.contactId === contactId);

    if (!contactToUpdate) {
      setIsContactLoading(false);
      return;
    }

    const unvalidatedUserInput = updateContactFormData;
    const validateUserInput =
      await contactInteractor.validateUserInputForUpdateContact(
        unvalidatedUserInput
      );
    if (!validateUserInput.success) {
      setIsContactLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validContactEntity = validateUserInput.validContactEntity;

    let encryptedNotes = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validContactEntity.notes) {
      encryptedNotes = await cryptographyInteractor.encryptData({
        text: validContactEntity.notes,
        masterPassword: masterPassword,
      });
    }

    const encryptedContactData = {
      companyName: validContactEntity.companyName,
      firstName: validContactEntity.firstName,
      lastName: validContactEntity.lastName,
      streetAddress: validContactEntity.streetAddress,
      additionalAddressInfo: validContactEntity.additionalAddressInfo,
      city: validContactEntity.city,
      stateProvinceRegion: validContactEntity.stateProvinceRegion,
      postalCode: validContactEntity.postalCode,
      country: validContactEntity.country,
      phoneNumber: validContactEntity.phoneNumber,
      email: validContactEntity.email,
      birthDate: validContactEntity.birthDate,
      encryptedNotes: encryptedNotes.encryptedData,
      notesEncryptionIv: encryptedNotes.iv,
      notesEncryptionSalt: encryptedNotes.salt,
    };

    const updateContactResponse = await contactInteractor.updateContact(
      contactId,
      encryptedContactData
    );
    if (!updateContactResponse.success) {
      setIsContactLoading(false);
      setMessage(updateContactResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state to avoid decryption
    const updatedContact = contacts.map((contact) => {
      if (contact.contactId === contactId) {
        return {
          ...contact,
          ...validContactEntity,
          decryptedPassword: validContactEntity.password,
          decryptedNotes: validContactEntity.notes,
        };
      }
      return contact;
    });

    setContacts(updatedContact);
    setIsContactLoading(false);
    setIsEditing(false);
    setMessage(updateContactResponse.message);
    setMessageType("success");
  };

  const processDeleteContact = async (contactId) => {
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
      <SearchInput
        placeholder={selectedOption}
        onSearchChange={setSearchTerm}
        searchOptions={searchOptions}
        onOptionChange={(e) => setSelectedOption(e.target.value)}
        selectedOption={selectedOption}
        pageName="contactsPage"
      />
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="contact-page__flash-message"
      />
      <NewContactForm
        newContactFormData={newContactFormData}
        setNewContactFormData={setNewContactFormData}
        handleChange={handleChange}
        processCreateContact={(e) => processCreateContact(e, masterPassword)}
        isContactLoading={isContactLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <ContactsOverview
        contacts={filteredContacts}
        handleSelectContactForEdit={handleSelectContactForEdit}
        processUpdateContact={processUpdateContact}
        processDeleteContact={processDeleteContact}
        isContactLoading={isContactLoading}
        message={message}
        messageType={messageType}
      />
    </ContactTemplate>
  );
};
