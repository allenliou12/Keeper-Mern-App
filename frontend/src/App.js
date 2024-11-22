import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';
import { useEffect } from 'react';
import { useNotesContext } from './hooks/useNotesContext';


function App() {
  //Use the useNotesContext() hook to get the notes and dispatch values from the NotesContext
  const { notes, dispatch } = useNotesContext()

  //Use the useEffect hook to fetch from the url
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/keeper")
      const json = await response.json()

      //If response is ok, the SET_NOTES action type is dispatched to the NotesContext with json(input) as payload, to the notesReducer function in the notesContext.js
      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json })
      }
    }

    fetchNotes()
  }, [dispatch])

  return (
    <div>
      <Header />
      <CreateArea />
      {/*Map through the notes array made available by the useContext hook, for each note, pass in the relevant key value pair */}
      {notes && notes.map((note) =>
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          createdAt={note.createdAt}
        />)
      }
      <Footer />
    </div>
  );
}

export default App;

