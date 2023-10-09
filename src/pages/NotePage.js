import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import notes from '../assets/data';
import { ReactComponent as GoHomeArrow } from '../assets/arrow-left.svg';

export default function NotePage({ history }) {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  // const note = notes.find((oneNote) => oneNote.id === parseInt(id));

  console.log(`ID: ${id}`);

  useEffect(() => {
    const getNote = async () => {
      try{
        const resp = await fetch(`http://localhost:5000/notes/${id}`);
        if(resp.status === 200){
          const data = await resp.json();
          setNote(data);
        }
        else{
          throw Error("Note not found");
        }
      }
      catch(err) {
        console.log(err.message);
      }
    };
    if(id !== "new") {
      getNote();
    }
    else {
      setNote({body: "", updated: new Date()});
    }
  }, [id]);

  const updateNote = async () => {
    if(note.body.trim() !== "") {
      if(id !== "new") {
        try {
          const resp = await fetch(`http://localhost:5000/notes/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...note, updated: new Date()})
          });
          if (resp.status === 200) {
            console.log(`UPDATED SUCCESSFULLY`);
          }
          else{
            throw Error("Note update failed.");
          }
        }
        catch(err) {
          console.log("UPDATE FAILED:  " + err.message);
        }
      }
      else {
        createNote();
      }
    }
    else {
      deleteNote();
    }
  };

  const createNote = async () => {
    if (id === "new") {
      if(note.body.trim() !== "") {
        try {
          const resp = await fetch(`http://localhost:5000/notes`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({body: note.body, updated: new Date()})
          });
          if (resp.status === 201) {
            console.log(`CREATED SUCCESSFULLY`);
            history.push("/");
          }
          else{
            throw Error("Note creation failed.");
          }
        }
        catch(err) {
          console.log("CREATION FAILED:  " + err.message);
        }
      }
      else {
        alert("Can't create empty body note");
      }
    }
  };

  const deleteNote = async () => {
      if (id !== "new") {
        try {
          const resp = await fetch(`http://localhost:5000/notes/${id}`, {
            method: "DELETE"
          });
          if(resp.status === 200) {
            console.log(`DELETE ${id}`);
            history.push("/");
          }
          else {
            throw Error("Delete failed");
          }
        }
        catch(err) {
          console.log("Delete failed: "+err.message);
        }
      }
  };



  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/' >
            <GoHomeArrow onClick={updateNote} />
          </Link>
        </h3>
        {id !== "new" ? 
          <button onClick={deleteNote}>Delete</button>
        :
          <button onClick={createNote}>Done</button>
        }
      </div>
      {note ? 
        <textarea value={note.body} rows="6" onChange={(e) => {
          setNote((oldSate) => {
            return {...oldSate, body: e.target.value};
          });
        }}  ></textarea>
        :
        <p>File not found</p>
      }
    </div>
  )
}
