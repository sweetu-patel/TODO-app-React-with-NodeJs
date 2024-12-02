import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const fetchAPI = async (url, token, methodType, body) => {
    const response = await fetch(url, {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      ...(methodType !== "GET" && { body: JSON.stringify(body) }),
    });
    return response.json();
  };

  const getAllNotes = async () => {
    const response = await fetchAPI(
      `${host}/api/notes/fetchallnotes`,
      localStorage.getItem("token"),
      "GET",
      {}
    );

    setNotes(response.data.notes);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    const data = { title, description, tag };
    const res = await fetchAPI(
      `${host}/api/notes/addnote`,
      localStorage.getItem("token"),
      "POST",
      data
    );
    debugger;
    if (res.status === 200) {
      getAllNotes();
    }
  };
  //Delete a note
  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    const resp = await fetchAPI(
      `${host}/api/notes/deletenote/${id}`,
      localStorage.getItem("token"),
      "DELETE",
      {}
    );

    if (resp.status === 200) {
      getAllNotes();
    }
  };
  //Update note
  const editNote = async (_id, title, description, tag) => {
    const data = { title, description, tag };

    const resp = await fetchAPI(
      `${host}/api/notes/updatenote/${_id}`,
      localStorage.getItem("token"),
      "PUT",
      data
    );

    if (resp.status === 200) {
      getAllNotes();
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
