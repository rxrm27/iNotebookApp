import React from "react";

export default function Noteitems(props) {
  const { note } = props;
  return (
    <div className="col-md-3 my-2">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title"> {note.title}</h5>
          <p class="card-text">{note.description} </p>
        </div>
      </div>
    </div>
  );
}
