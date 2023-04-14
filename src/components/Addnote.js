import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext"  //importing context

function Addnote() {
    const context = useContext(noteContext)
    const { addNote } = context; //destructring notes from context
    //create a state for onchange function only
    const [note, setNote] = useState({title:"", description:"", tag:"personal"})
    // functions
    const handleSubmit =(e)=> {
        e.preventDefault();
        //addNote(note); this will return the hardcoded value in noteState.js
        addNote(note.title, note.description, note.tag)
    }
    const onchange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value}) 
    }
    return (
        <div>
            <h3 className='my-3'>Add a  Note</h3>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Note Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onchange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Note description</label>
                <textarea className="form-control" rows="3" id="description" name="description" onChange={onchange} ></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>

        </div>
    )
}

export default Addnote