import React from "react";

export default function Noteitems(props) {
  const { note } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex mb-3">
            <div className="me-auto p-2"><h5 className="card-title"> {note.title}</h5></div>
            <div className="p-2"><i className="fa-regular fa-pen-to-square"></i></div>
            <div className="p-2"><i className="fa-sharp fa-solid fa-trash"></i></div>
          </div>
          <p className="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
}
