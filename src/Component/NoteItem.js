import React, { useContext }  from 'react'
import Alert from './Alert'
import noteContext from '../Context/Notes/noteContext';
export default function NoteItem(props) {

 const context = useContext(noteContext);
 
const {deleteNote} = context;
const {note, updateNote} = props;

    const handleDeleteNote = () =>{
   
        props.setAlert(true);
        setTimeout(()=>{
            props.setAlert(false); 
        }, 1000);
      }
  return (
    <div className='col-md-3 '>
      <div className="card my-3" >
  <div className="card-body  text-left">
    <h5 className="card-title">{note.title} </h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{note.description}</h6>
   
    
   
  </div>
  <div className='card-body d-flex'>  <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note)}}></i>&nbsp;&nbsp;<i className="fa-solid fa-trash" onClick={() => {deleteNote(props.id)}}></i></div>
</div>
    </div>
  )
}
