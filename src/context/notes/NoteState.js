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
    return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;