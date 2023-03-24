import React from 'react'
import Notes from './Notes';
export default function Home() {

  return (
    <>
    <div className='container'>
      <h3 className='my-3'>Enter your Note</h3>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Note Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Note description</label>
        <textarea className="form-control"  rows="3"></textarea>
      </div>
      <h3 className='my-3'>Your Notes appear here</h3>
      {/* mapping notes in html */}
      <Notes/>
    </div>

    </>
  )
}
