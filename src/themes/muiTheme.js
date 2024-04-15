import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fde8c9',
    },
    secondary: {
      main: '#01333e',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontFamily: 'Yeseva One, cursive',
      fontSize: '2.0rem',
      padding: '10px',
      fontWeight: 700,
      color: '#fde8c9',
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
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.8rem',
      fontWeight: 100,
      color: '#fde8c9',
    },
    p: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '15px',
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    container: {
      backgroundColor: '#000',
      height: '100vh',
      width: '100%',
      marginBottom: '100px',
      marginTop: '20px',
    },
  },
});

export default theme;
