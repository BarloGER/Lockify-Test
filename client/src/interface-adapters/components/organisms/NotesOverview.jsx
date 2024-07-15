import PropTypes from "prop-types";
import { NoteCard } from "../molecules";
import "./assets/notes-overview.css";

export const NotesOverview = ({
  notes,
  handleSelectNoteForEdit,
  processUpdateNote,
  processDeleteNote,
  isNoteLoading,
}) => {
  return (
    <section className="notes-overview">
      {notes.map((note, index) => (
        <NoteCard
          key={note.noteId || index}
          note={note}
          handleSelectNoteForEdit={() => handleSelectNoteForEdit(note.noteId)}
          processUpdateNote={processUpdateNote}
          processDeleteNote={processDeleteNote}
          isLoading={isNoteLoading}
        />
      ))}
    </section>
  );
};

NotesOverview.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      noteId: PropTypes.number.isRequired,
      decryptedNoteTitle: PropTypes.string,
      decryptedNoteContent: PropTypes.string,
    })
  ).isRequired,
  handleSelectNoteForEdit: PropTypes.func.isRequired,
  processUpdateNote: PropTypes.func.isRequired,
  processDeleteNote: PropTypes.func.isRequired,
  isNoteLoading: PropTypes.bool,
};
