import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/checkbox.css";

export const Checkbox = ({ id, name, label, checked, onChange }) => {
  const { t } = useTranslation();

  return (
    <label htmlFor={id || name} className="checkbox">
      {t(label)}
      <input
        id={id || name}
        name={name}
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
