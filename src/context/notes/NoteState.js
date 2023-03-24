//make a state that is accesible to all
import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) =>{
    const notesInitial = [
            {
              "_id": "6410bfc95eb65817535438aa",
              "title": "firstNote",
              "description": "this is description",
              "tag": "personal",
              "date": "2023-03-14T18:41:13.304Z",
              "__v": 0
            },
            {
              "_id": "6410c08743afd6727af0c3a2",
              "title": "secondNote",
              "description": "this is description",
              "tag": "personal",
              "date": "2023-03-14T18:44:23.968Z",
              "__v": 0
            },
            {
              "_id": "6410c08843afd6727af0c3a6",
              "title": "thirdNote",
              "description": "this is description",
              "tag": "personal",
              "date": "2023-03-14T18:44:24.289Z",
              "__v": 0
            },
            {
              "_id": "6410c08843afd6727af0c3a8",
              "title": "firstNote",
              "description": "thisdescription",
              "tag": "personal",
              "date": "2023-03-14T18:44:24.453Z",
              "__v": 0
            },
            {
              "_id": "6410c12843afd6727af0c3d2",
              "title": "firstNote updated",
              "description": "thisdescription updated",
              "tag": "personal",
              "date": "2023-03-14T18:47:04.116Z",
              "__v": 0
            }
          ]

    const [notes, setNotes] = useState(notesInitial)

    //Add a Note
    const addNote =(title, description, tag)=>{
      //insert API calles here
      //console.log("adding a new note")
      let note = {
        "_id": "6410c12843afd6727af0c3d2",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-03-14T18:47:04.116Z",
        "__v": 0
      }
//use concat as it will return new array(dont use Push as it will update the array)
      setNotes(notes.concat(note)) 
    }
    const deleteNote =(id)=>{
      //insert API calles here
      //console.log("delete the note with ID: "+ id);
      const newNote = notes.filter((note)=>(note._id !== id))
      setNotes(newNote)
    }
    const editNote =()=>{

    }
    return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;