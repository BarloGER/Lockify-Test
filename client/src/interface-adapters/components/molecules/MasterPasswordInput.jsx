import PropTypes from "prop-types";
import { useState } from "react";
import { Input, Modal, ToggleVisibilityButton } from "../atoms";
import { PiPasswordFill } from "react-icons/pi";
import "./assets/password-input.css";

export const MasterPasswordInput = ({ id, name, label, value, onChange }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const generatePassword = () => {
    const numbers = "0123456789";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+{}:\"<>?|[];',./`~";

    const getRandomChar = (category) => {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      const randomIndex = buffer[0] % category.length;
      return category[randomIndex];
    };

    let newPassword = [];
    // Ensure minimum requirements
    for (let i = 0; i < 3; i++) {
      newPassword.push(getRandomChar(numbers));
      newPassword.push(getRandomChar(lowerCaseLetters));
      newPassword.push(getRandomChar(upperCaseLetters));
      newPassword.push(getRandomChar(specialChars));
    }

    // Fill the rest up to 16 characters
    while (newPassword.length < 16) {
      const allChars =
        numbers + upperCaseLetters + specialChars + lowerCaseLetters;
      newPassword.push(getRandomChar(allChars));
    }

    // Shuffle the array to ensure randomness of character positions
    for (let i = newPassword.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPassword[i], newPassword[j]] = [newPassword[j], newPassword[i]];
    }

    onChange({ target: { name, value: newPassword.join("") } });
  };

  return (
    <div className="password-input__container">
      <Modal
        text="registerPage.masterPasswordModal.text"
        points={[
          "registerPage.masterPasswordModal.length",
          "registerPage.masterPasswordModal.lowercase",
          "registerPage.masterPasswordModal.uppercase",
          "registerPage.masterPasswordModal.number",
          "registerPage.masterPasswordModal.specialCharacters",
        ]}
      />
      <Input
        id={id}
        name={name}
        label={label}
        type={isPasswordHidden ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <div className="password-input__button-wrapper">
        <button
          onClick={generatePassword}
          type="button"
          className="generate-password-button"
        >
          <PiPasswordFill />
        </button>
        <ToggleVisibilityButton
          isValueHidden={isPasswordHidden}
          setIsValueHidden={setIsPasswordHidden}
        />
      </div>
    </div>
  );
};

MasterPasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
