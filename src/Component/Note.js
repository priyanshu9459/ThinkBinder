import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/Notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
export default function Note(props) {
  const { notes, getNotes, editNote } = useContext(noteContext);
  let history = useNavigate();
  useEffect(() => {
    
    if(localStorage.getItem('token'))
    {
      getNotes();
    }else{
      history('/login');
    }

  }, [])
  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
  
  const updateNote = (note) => {
    ref.current.click();
    props.showAlert("Updated Successfull", "success")
    setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
  }
  const handleclick = async (e) => {
    e.preventDefault();
   
  }
  const handleSaveChanges = async (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    
   refclose.current.click();

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  

  return (
    <div>

      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <h2>Edit Note</h2>
                <div className='container'>
                  <form className='my-3'>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="titles" aria-describedby="textHelp" value={note.etitle} name="etitle" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="descriptions" name="edescription" value={note.edescription} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="descriptions" name="etag" value={note.etag} onChange={onChange} />
                    </div>
                   
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer" >
              <button ref={refclose}  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"  onClick={handleSaveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes && notes.map((e, i) => {
          
          return <NoteItem note={e} setAlert={props.setAlert} key={i} id={e._id} updateNote={updateNote}  ></NoteItem>
        })}
      </div>
    </div>
  )
}
