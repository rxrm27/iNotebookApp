import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"  //importing context
import Noteitems from './Noteitems';

export default function Notes() {
  const context = useContext(noteContext)
  const { notes, setNotes } = context; //destructring notes from context
  return (
    <div className='row '>
        {notes.map((note)=>{
            return <Noteitems note = {note}/>
  
        })} 
    </div>  
  )
}
