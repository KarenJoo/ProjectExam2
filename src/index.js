import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import App from './App';
import './index.css';
import store from './storage/store';
import theme from './themes/muiTheme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
    <Router>
    <Provider store={store}>

    <App />
    </Provider>
    </Router>
    </ThemeProvider>
    </React.StrictMode>
);