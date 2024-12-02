import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const Alertcontext = useContext(alertContext);
  const { deleteNote, editNote } = context;
  const { showAlert } = Alertcontext;
  const { note, updateNote } = props;

  const Notedelete = (id) => {
    deleteNote(id);
    showAlert("Note Deleted successfully!!", "warning");
  };
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-regular fa-trash-can mx-2"
              onClick={() => {
                Notedelete(note._id);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
