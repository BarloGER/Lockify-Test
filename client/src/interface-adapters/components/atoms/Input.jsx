import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/input.css";

export const Input = ({ label, type, value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="input__container">
      <label className="input__label">{t(label)}</label>
      <input
        className="input__field"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
