import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
const color = yellow[800];

const theme = createTheme({
  palette: {
    primary: {
      main: color
    }
  },
});

//Using the useState function to get the state as well as to update the state(newNote).
//Firstly the newNote state is set to have empty strings as key value pair, which can then be updated using the updateNewNote() down the line
function CreateArea(props) {
  const { dispatch } = useNotesContext()
  const [newNote, updateNewNote] = useState({
    id: "",
    title: "",
    content: ""
  })

  const [error, setError] = useState(null)

  //On Click, run the following async code
  const handleClick = async () => {
    // Debug logs
    console.log('Attempting to submit note:', newNote);

    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError("Sorry but the system does not accept empty notes...")
      return;
    }

    try {
      const response = await fetch("/api/keeper", {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const json = await response.json()

      // Add debug log
      console.log('Server response:', json);

      if (response.ok) {
        console.log("New Note added!", json);
        dispatch({ type: "CREATE_NOTE", payload: json })
        updateNewNote({
          title: "",
          content: ""
        })
        setError(null)
      } else {
        setError(json.error || "Failed to create note")
      }
    } catch (error) {
      console.error('Error details:', error);
      setError("Network error - please try again")
    }
  }


  //UseState function to set the boolean for expanded, so that it can be use in the code
  const [expanded, setExpanded] = useState(false)

  function expand() {
    setExpanded(true)
  };

  //When change is detected in the input, this function is called, and the name + value of the event that triggered the change is used to update the state declared at the beginning
  function handleChange(event) {
    const { name, value } = event.target

    updateNewNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <form className="create-note" onSubmit={(event) => {
          //prevent form from resubmitting everytime on click
          event.preventDefault()
        }}>

          {/*Only expand title when clicked On*/}
          {expanded && <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={newNote.title} />}

          {/*Only expand row to 3 when clicked*/}
          <textarea
            onClick={expand}
            onChange={handleChange}
            name="content"
            placeholder="Take a note..."
            rows={expanded ? 3 : 1}
            value={newNote.content} />

          {/*button to only zoom in when clicked on*/}
          <Zoom in={expanded ? true : false}>
            <Fab
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.main'
                }
              }}
              onClick={handleClick}
            >
              <Icon path={mdiPlus} size={1} />
            </Fab>
          </Zoom>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </ThemeProvider>
  );
}

export default CreateArea;