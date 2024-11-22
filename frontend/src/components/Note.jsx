import { useNotesContext } from '../hooks/useNotesContext';
import Icon from '@mdi/react';
import EditingNote from './Editing';
import { mdiDeleteEmptyOutline } from '@mdi/js';
import { mdiSquareEditOutline } from '@mdi/js';
import Fab from '@mui/material/Fab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import { useState } from 'react';
const color = yellow[800];

//Theme to set the color
const theme = createTheme({
  palette: {
    primary: {
      main: color
    }
  },
});

function Note(props) {
  const { dispatch } = useNotesContext()

  //Set the boolean value for whether if the note is being edited
  const [isEditing, setIsEditing] = useState(false)

  //Function to fetch the DELETE method from the database
  //Reason no need to use the useEffect hook again is because there is no need to fetch the note again from the server, as the notes are already stored in the state when it was first called
  //And also the handleDelete function only affects one specific note
  const handleDelete = async () => {
    const response = await fetch("/api/keeper/" + props.id, {
      method: "DELETE"
    })

    const json = await response.json()

    //If response is OK, meaning all good, send the action type for dispatch as DELETE_NOTE and the json(the deleted note) as payload
    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json })
      console.log("Note deleted!", json)
    }
  }

  //Function to change the boolean value of isEditing
  const handleEdit = () => {
    setIsEditing(true)
  }

  //Function to change the boolean value of isEditing
  const handleClose = () => {
    setIsEditing(false)
  }

  return (
    <ThemeProvider theme={theme}>

      {/* Check the state of isEditing, if its true, render the EditNote form, else just display the note as it is */}
      {isEditing ?
        <EditingNote
          key={props.id}
          id={props.id}
          title={props.title}
          content={props.content}
          createdAt={props.createdAt}
          OnClose={handleClose}
        />
        :
        <div className="note">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <p className='timestamp'>{props.createdAt}</p>


          {/*Button to handle delete*/}
          <Fab sx={
            {
              '&:hover': {
                backgroundColor: 'primary.main'
              }
            }}
            onClick={handleDelete}>
            <Icon
              path={mdiDeleteEmptyOutline}
              size={1} />
          </Fab>

          {/*Button to handle edit*/}
          <Fab sx={
            {
              '&:hover': {
                backgroundColor: 'primary.main'
              }
            }}
            onClick={handleEdit}>
            <Icon path={mdiSquareEditOutline} size={1} />
          </Fab>
        </div>
      }

    </ThemeProvider>
  );
}

export default Note;
