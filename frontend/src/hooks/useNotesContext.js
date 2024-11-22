import { NotesContext } from "../context/notesContext";
import { useContext } from "react";

//Creates and export a custom hook called useNotesContext, which provides access to state and dispatch function of the NotesContext context from notesContext.js
export const useNotesContext = () => {
  //useContext hook to access the Notes Context
  const context = useContext(NotesContext)

  //if there are not context provided by the NotesContextProvider component, throw an error
  if (!context) {
    throw Error("UseNotesContext must be used inside a NotesContextProvider!")
  }

  //Returns the context object, which includes the notes state and dispatch function, which allows other components to access and manipulate the state using dispatch function
  return context
}