import React from 'react'
import { Link } from 'react-router-dom'

export default function ListItem(props) {

  const getTitle = () => {
    const noteTitle = props.note.body.split("\n")[0];
    if (noteTitle.length > 30) {
      return noteTitle.slice(0, 30);
    }
    return noteTitle;
  };

  const getContent = () => {
    let noteTitle = props.note.body.split("\n")[0];

    if (noteTitle.length > 30) {
      noteTitle = noteTitle.slice(0, 30);
    }
    return props.note.body.slice(noteTitle.length).replaceAll("\n", ", ").replace(/^(,\s)+/, "");
  };
  
  return (
    <Link to={`/note/${props.note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle()}</h3>
        <p><span>{new Date(props.note.updated).toLocaleDateString()}</span></p>
        <div>
          {getContent()}
        </div>
      </div>
    </Link>
  )
}
