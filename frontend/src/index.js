import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//Import the context provider to wrap it with the App component, so that the global state can be accessed when needed
import { NotesContextProvider } from './context/notesContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </React.StrictMode>
);
