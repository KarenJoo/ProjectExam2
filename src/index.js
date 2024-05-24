import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './themes/muiTheme'
import { Provider } from 'react-redux';
import store from './storage/store';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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