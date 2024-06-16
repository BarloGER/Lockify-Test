import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./assets/textarea.css";

export const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  minLength = "20",
  maxLength = "500",
  rows = "5",
  columns = "50",
}) => {
  const { t } = useTranslation();
  const [remainingChars, setRemainingChars] = useState(
    maxLength - value.length
  );

  const handleChange = (e) => {
    const enteredText = e.target.value;
    setRemainingChars(maxLength - enteredText.length);
    onChange(e);
  };

  return (
    <div className="textarea__container">
      <label className="textarea__label">{t(label)}</label>
      <textarea
        className="textarea__field"
        placeholder={t(placeholder)}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        cols={columns}
        value={value}
        onChange={handleChange}
      />
      <div className="textarea__remaining">
        {t("Verbleibende Zeichen")}: {remainingChars}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  minLength: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  columns: PropTypes.string.isRequired,
};
