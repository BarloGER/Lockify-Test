import PropTypes from "prop-types";
import { NoteCard } from "../molecules";
import "./assets/notes-overview.css";

export const NotesOverview = ({
  notes,
  onSelectNote,
  onEditNote,
  onDeleteNote,
  isNoteLoading,
}) => {
  return (
    <section className="notes-overview">
      {notes.map((note, index) => (
        <NoteCard
          key={note.noteId || index}
          note={note}
          onSelect={() => onSelectNote(note.noteId)}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
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
  onSelectNote: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  isNoteLoading: PropTypes.bool,
};
