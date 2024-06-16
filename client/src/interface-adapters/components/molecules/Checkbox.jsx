import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/checkbox.css";

export const Checkbox = ({ label, checked, onChange }) => {
  const { t } = useTranslation();

  return (
    <label className="checkbox">
      {t(label)}
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
