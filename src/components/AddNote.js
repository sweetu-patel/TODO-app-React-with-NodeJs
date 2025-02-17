import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const Alertcontext = useContext(alertContext);
  const { addNote } = context;
  const { showAlert } = Alertcontext;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = async (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);

    setNote({ title: "", description: "", tag: "" });
    showAlert("Note added successfully!!", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            minLength={3}
            onChange={onChange}
            value={note.title}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            minLength={5}
            onChange={onChange}
            value={note.description}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          ></input>
        </div>

        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
