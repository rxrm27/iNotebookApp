import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"  //importing context

export default function Noteitems(props) {
  const { note } = props;
  const context = useContext(noteContext)
  const { deleteNote } = context; //destructring notes from context
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex mb-3">
            <div className="me-auto p-2"><h5 className="card-title"> {note.title}</h5></div>
            <div className="p-2"><i className="fa-regular fa-pen-to-square"></i></div>
            <div className="p-2"><i className="fa-sharp fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i></div>
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
}
