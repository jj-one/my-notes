import React, { useEffect, useState } from 'react'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton';

export default function NoteListPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try{
      const resp = await fetch("http://localhost:5000/notes");
      if(resp.status === 200){
        const data = await resp.json();
        setNotes(data);
      }
      else{
        throw Error("Data not found");
      }
    }
    catch(err) {
      console.log(err.message);
    }
  };

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='note-list'>
        {notes.map((note, index) => (
            <ListItem note={note} key={index} />
          )
        )}
      </div>
      <AddButton />
    </div>
  )
}
