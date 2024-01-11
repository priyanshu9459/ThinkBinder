import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/noteContext';

export default function AddNote(props) {

  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "default" })

  const handleclick = async (e) => {
    e.preventDefault();
    console.log(note.title);
    addNote(note.title, note.description, note.tag, props.showAlert);
  }
  const onChange = (e) => {
    
    setNote({ ...note, [e.target.name]: e.target.value });
  }


  return (
    <div>
      <h2>Add Your Note Here</h2>
      <div className='container'>
        <form className='my-3' >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="titles" aria-describedby="textHelp" name="title" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="descriptions" name="description" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="descriptions" name="tag" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
        </form>
      </div>
    </div>
  )
}
