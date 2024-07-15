import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./assets/search-input.css";

export const SearchInput = ({
  onSearchChange,
  searchOptions,
  onOptionChange,
  selectedOption,
  pageName,
}) => {
  const { t } = useTranslation();

  const placeholderText = t(`${pageName}.searchPlaceholder.${selectedOption}`);
  const instructionText = t(`${pageName}.changeSearchOption`);

  return (
    <div className="search-container">
      <label htmlFor="search-select">{instructionText}</label>
      <select
        id="search-select"
        value={selectedOption}
        onChange={onOptionChange}
        className="search-select"
      >
        {searchOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {t(`${pageName}.${option.value}`)}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="search-input"
        placeholder={placeholderText}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOptionChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};
