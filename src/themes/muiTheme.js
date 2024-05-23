import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#01333e',
    },
    secondary: {
      main: '#fde8c9',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontFamily: 'Yeseva One, cursive',
      fontSize: '2.0rem',
      padding: '10px',
      fontWeight: 700,
      color: '#01333e',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#01333e',
      marginBottom: '10px'
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.0rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.8rem',
      fontWeight: 100,
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.5rem',
      fontWeight: 100,

    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.8rem',
      fontWeight: 400,
    }

  },
});

export default theme;
