//make a state that is accesible to all
import { useState } from "react";
import NoteContext from "./NoteContext";
const host = "http://localhost:5000";
const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //Get all Notes
  const getNotes = async (title, description, tag) => {
    //API caLL
    try {
      const url = `${host}/api/notes/fetchnotes`;
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQwZjI1NTdkNjFlMGI2NmI4YWI2Y2RjIiwiaWF0IjoxNjc4ODE2NDU5fQ.iwK34mvkw4q8QH48KVdkcLtp3g5RAC_yyZcx_cBrad8",
        },
        body: JSON.stringify(), // body data type must match "Content-Type" header
      });
      const allNotes = await response.json(); // parses JSON response into native JavaScript objects
      console.log(allNotes);
      setNotes(allNotes);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Fetching Notes");
    //use concat as it will return new array(dont use Push as it will update the array)
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API caLL
    try {
      const url = `${host}/api/notes/addnotes`;
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQwZjI1NTdkNjFlMGI2NmI4YWI2Y2RjIiwiaWF0IjoxNjc4ODE2NDU5fQ.iwK34mvkw4q8QH48KVdkcLtp3g5RAC_yyZcx_cBrad8",
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      setNotes(notes.concat(json));
    } catch (error) {
      console.error("Error:", error);
    }
    //console.log("adding a new note")
    //use concat as it will return new array(dont use Push as it will update the array)
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //insert API calles here
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQwZjI1NTdkNjFlMGI2NmI4YWI2Y2RjIiwiaWF0IjoxNjc4ODE2NDU5fQ.iwK34mvkw4q8QH48KVdkcLtp3g5RAC_yyZcx_cBrad8",
      }
    });
     await response.json(); //what to do with this value saved?
   // console.log("delete the note with ID: "+ id);
    //updating the UI
    const newNote = notes.filter((note) => note._id !== id);
    setNotes(newNote);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API caLL
    const url = `${host}/api/notes/updatenote/6410c12843afd6727af0c3d2`;
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQwZjI1NTdkNjFlMGI2NmI4YWI2Y2RjIiwiaWF0IjoxNjc4ODE2NDU5fQ.iwK34mvkw4q8QH48KVdkcLtp3g5RAC_yyZcx_cBrad8",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    //code of client Side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
