import Icon from '@mdi/react';
import { mdiNoteEditOutline } from '@mdi/js';
import { mdiNoteSearchOutline } from '@mdi/js';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import { useState } from 'react';
import { useNotesContext } from '../context/notesContext';
const color = yellow[800];

const theme = createTheme({
  palette: {
    primary: {
      main: color
    }
  },
});


function Header() {
  // Local state to store what user types
  const [searchTerm, setSearchTerm] = useState('');

  // Get dispatch function from context
  const { dispatch } = useNotesContext();

  // Called every time user types in search box
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  // Update input field

    // Tell context to filter notes
    dispatch({ type: 'SEARCH_NOTES', payload: term });
  };

  return (
    <ThemeProvider theme={theme}>
      <header>
        <h1>
          <Icon
            path={mdiNoteEditOutline}
            size={1.2} />Keeper
        </h1>

        <TextField
          placeholder='Search Keeper Notes'
          className='search-box'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span>
                  <Icon path={mdiNoteSearchOutline} size={1} />
                </span>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            borderRadius: "4px",
            '&:hover': {
              borderColor: "primary.main"
            }
          }}
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
    </ThemeProvider>

  )

}

export default Header;