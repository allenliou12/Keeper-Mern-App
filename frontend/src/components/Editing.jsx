import Icon from '@mdi/react';
import { mdiContentSavePlusOutline } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import Fab from '@mui/material/Fab';
import { useState } from 'react';
import { useNotesContext } from '../hooks/useNotesContext';

const EditingNote = (props) => {
  //Get the dispatch object from the useReducer hook
  const { dispatch } = useNotesContext()

  //Create a state using a useState, and pass in the content of the note as its default value so that the note will have its original content to be edited
  const [updatedNote, setUpdatedNote] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
    error: null
  });

  //Function to update the content of the note
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //Pass in all previous value of the note, and set the value(input) and the [name] of the it as key value pair
    setUpdatedNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  };

  //Function to fetch a Patch request from the database
  const handleSubmit = async () => {

    const response = await fetch("/api/keeper/" + props.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedNote)
    });

    const json = await response.json();

    //If response is ok, meaning all good, pass in the action type of UPDATE_NOTE as action type and the updated note as the payload for the reducer function to update the global state.
    //After that finally call the onClose function
    if (response.ok) {
      dispatch({ type: "UPDATE_NOTE", payload: json })
      props.OnClose()
    }
  };

  return (
    <div className="note">

      {/* Close Button */}
      <Fab sx={
        {
          '&:hover': {
            backgroundColor: 'primary.main'
          }
        }}
        //When onClick trigger the OnClose function passed in as prop
        onClick={props.OnClose}
      >
        <Icon path={mdiClose} size={1} />
      </Fab>

      <form className='edit-note' onSubmit={(event) => {
        //prevent form from resubmitting everytime on click
        event.preventDefault()
      }}>
        <input
          value={updatedNote.title}
          onChange={handleInputChange}
          name="title"
        ></input>

        <textarea
          value={updatedNote.content}
          name="content"
          onChange={handleInputChange}
        ></textarea>


        {/*Button to save edit*/}
        <Fab sx={
          {
            '&:hover': {
              backgroundColor: 'primary.main'
            }
          }}
          onClick={handleSubmit}
        >
          <Icon path={mdiContentSavePlusOutline} size={1} />
        </Fab>
      </form>
    </div>

  )
}

export default EditingNote