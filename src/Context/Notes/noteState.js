import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:8000"
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get All Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/auth/fetchallnotes`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4ZmFiNDJkM2JjMTk3ZDJjNTNhYTkzIn0sImlhdCI6MTcwNDE0MDgxMH0.HuozIClhFQG9beDAEEgTsZItLyc3y06ATiBt0qKxokI",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Error:', error);
    }
  };




  // Add a note
  const addNote = async (title, description, tag, showAlert) => {
   
    // Todo API Call
    const response = await fetch(`${host}/api/auth/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    
    let note = {
      "user": "658fab42d3bc197d2c53aa93",
      "title": title,
      "description": description,
      "tag": tag,
      "_id": "65932d59995b75848fff4295",
      "__v": 0
    };
    showAlert("Note Added Successfully", "success")
  
    setNotes(notes.concat(note))

  }
  //Delete a Note 
  const deleteNote = async (id) => {


    const response = await fetch(`${host}/api/auth/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

    });
    const json = response.json();
   

    const newNotes = notes.filter((note) => { return note._id !== id })
    props.showAlert("Note Successfully deleted", "success")
    setNotes(newNotes);
   
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {

    //  api call 
    const response = await fetch(`${host}/api/auth/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),

      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    console.log(newNotes);
    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{  notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
