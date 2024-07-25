import PropTypes from "prop-types";
import { useState } from "react";
import { Input, ToggleVisibilityButton } from "../atoms";
import "./assets/hidden-input.css";

export const HiddenInput = ({ id, name, label, value, onChange }) => {
  const [isValueHidden, setIsValueHidden] = useState(true);

  return (
    <div className="hidden-input__container">
      <Input
        id={id}
        name={name}
        label={label}
        type={isValueHidden ? "password" : "text"}
        value={value}
        onChange={onChange}
      ></Input>
      <ToggleVisibilityButton
        isValueHidden={isValueHidden}
        setIsValueHidden={setIsValueHidden}
      />
    </div>
  );
};

HiddenInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
