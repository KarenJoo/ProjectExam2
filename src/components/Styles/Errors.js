import React from 'react';
import { Alert } from '@mui/material';

export const AlertError = ({ message }) => {
  return (
    <Alert variant="standard" severity="error" sx={{ mt: 2, margin: '10px auto' }}>
      {message || ''}
    </Alert>
  );
};


export const AlertWarning = ({ message }) => {
  return (
    <Alert variant="filled" severity="warning" sx={{ mt: 2, margin: '100px auto', width: '100%' }}>
      {message || ''}
    </Alert>
  )
}
