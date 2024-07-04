import PropTypes from "prop-types";
import "./assets/note-template.css";

export const NoteTemplate = ({ children }) => {
  return <section className="account__template">{children}</section>;
};
