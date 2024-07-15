import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/input.css";

export const Input = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  autocomplete = "off",
}) => {
  const { t } = useTranslation();

  return (
    <div className="input__container">
      <label htmlFor={id || name} className="input__label">
        {t(label)}
      </label>
      <input
        id={id || name}
        name={name}
        className="input__field"
        type={type}
        value={value || ""}
        onChange={onChange}
        autoComplete={autocomplete}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autocomplete: PropTypes.string,
};
