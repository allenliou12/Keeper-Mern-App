import { createContext, useReducer, useContext } from "react";

//Create and export a context to use as a global state
export const NotesContext = createContext();

// Add this custom hook
export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw Error('useNotesContext must be used inside a NotesContextProvider');
  }
  return context;
}

//Define the notesReducer function to be passed as one of the argument in the useReducer hook
//The notesReducer function is responsible for handling all state updates of notes. It takes two arguments - (state) which is the current state of the notes, and (action) which is an object that describes the update to be made to the state.
export const notesReducer = (state, action) => {
  switch (action.type) {
    //Specify cases to be handled, like an if statement
    //If the action.type sent by the dispatch is of is SET_NOTES, the notes which is originally null to start with, is replaced with the payload data (the input by user)
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
        allNotes: action.payload  // Store a backup of all notes for searching
      }

    //If the action.type sent by the dispatch is of CREATE_NOTE, a new note is created, and added to the beginning of the array, together with all the previously created note
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        allNotes: [action.payload, ...state.allNotes]  // Also update allNotes for search functionality
      }

    //If the action.type sent by the dispatch is of DELETE_NOTE, filter through the array, and show only the note that has an id that is not equal to the id of the clicked note.
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload._id),
        allNotes: state.allNotes.filter((note) => note._id !== action.payload._id)  // Also remove from allNotes
      }

    //If the action.type sent is of UPDATE_NOTE, map through the existing note, and check for the note that has the same id as the updated note(payload), if found such note, update the title and content of that specific note, to that of the updated note content.
    case "UPDATE_NOTE":
      const updatedNote = action.payload;
      const updatedNotes = state.notes.map((note) => {
        if (note._id === updatedNote.note._id) {
          return {
            ...note,
            title: updatedNote.note.title,
            content: updatedNote.note.content
          }
        }
        return note;
      })
      const updatedAllNotes = state.allNotes.map((note) => {
        if (note._id === updatedNote.note._id) {
          return {
            ...note,
            title: updatedNote.note.title,
            content: updatedNote.note.content
          }
        }
        return note;
      })
      return {
        ...state,
        notes: updatedNotes,
        allNotes: updatedAllNotes  // Keep allNotes in sync for search
      }

    case "SEARCH_NOTES":
      console.log('Searching notes with term:', action.payload);
      const searchTerm = action.payload.toLowerCase();
      // Filter notes based on search term
      const filteredNotes = state.allNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
      );
      console.log('Filtered notes:', filteredNotes);
      return {
        ...state,
        notes: filteredNotes // Update the state with filtered notes
      }

    default:
      return state
  }
}


//The children prop is passed to the provider to wrap all child component with access to the global state
export const NotesContextProvider = ({ children }) => {
  //The useReducer is destructured to [state, dispatch]:
  //  First the current state(state) of the reducer, and when dispatch function is called, the state will be updated, and the component re-renders with the updated state.
  //  Second is the (dispatch) a function,which must have the type property, and an optional payload object, to send the action type to the notesReducer function, which do something according to the action type.
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],      // Notes that are currently displayed
    allNotes: []    // Backup of all notes for search functionality
  })

  //The context will pass in the spreaded global state, and the update state function(dispatch) to its children, or whatever inside it
  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}