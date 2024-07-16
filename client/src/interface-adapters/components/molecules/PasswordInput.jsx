import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../atoms";
import { PiPasswordFill } from "react-icons/pi";
import "./assets/password-input.css";

export const PasswordInput = ({ value, onChange }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordHidden(!isPasswordHidden);
  };

  const generatePassword = () => {
    const numbers = "0123456789";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";

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
      newPassword.push(getRandomChar(specialChars));
      newPassword.push(getRandomChar(upperCaseLetters));
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

    onChange({ target: { value: newPassword.join("") } }, "password");
  };

  return (
    <div className="password-input">
      <Input
        id="password"
        label={"accountsPage.password"}
        type={isPasswordHidden ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e, "password")}
        name="password"
      />
      <button
        onClick={togglePasswordVisibility}
        className="toggle-visibility-button"
      >
        {isPasswordHidden ? <FaEyeSlash /> : <FaEye />}
      </button>
      <button
        onClick={generatePassword}
        type="button"
        className="generate-password-button"
      >
        <PiPasswordFill />
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
