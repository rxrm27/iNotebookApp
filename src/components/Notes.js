import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"  //importing context
import Noteitems from './Noteitems';
import Addnote from './Addnote';

export default function Notes() {
  const context = useContext(noteContext)
  const { notes } = context; //destructring notes from context
  return (
    <>      
    <Addnote/>
    <h3 className='my-3'>Your Notes appear here</h3>  
    <div className='row '>

        {notes.map((note)=>{
            return <Noteitems key={note._id} note = {note}/>
  
        })} 
    </div> </>
  )
}
