import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Modal from "./Modal";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const Alertcontext = useContext(alertContext);
  const { notes, getAllNotes, editNote } = context;
  const { showAlert } = Alertcontext;
  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/login");
    } else {
      getAllNotes();
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    e_id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = () => {
    editNote(note.e_id, note.etitle, note.edescription, note.etag);
    showAlert("Note Update successfully!!", "success");
  };
  const onChange = (e) => {
    debugger;
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const modalRef = useRef(null);

  const updateNote = (currentNote) => {
    setNote({
      e_id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    modalRef.current.openModal();
    //ref.current.click();
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote />

      <Modal
        ref={modalRef}
        title="Edit Note"
        onSave={handleClick}
        isSaveDisabled={note.etitle.length < 3 || note.edescription.length < 5}
      >
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              onChange={onChange}
              value={note.etitle}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onChange}
              value={note.edescription}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange={onChange}
              value={note.etag}
            ></input>
          </div>
        </form>
      </Modal>
      <div className="container row my-3">
        <h2>Your Notes</h2>

        {notes.length === 0 ? (
          <div>No notes to display</div>
        ) : (
          notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })
        )}
      </div>
    </>
  );
};

export default Notes;
