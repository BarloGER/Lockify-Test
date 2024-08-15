import PropTypes from "prop-types";
import "./assets/note-template.css";

export const NoteTemplate = ({ children }) => {
  return <main className="notes-template">{children}</main>;
};

NoteTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
