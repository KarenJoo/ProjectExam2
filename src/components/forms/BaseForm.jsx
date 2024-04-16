// BaseForm.jsx

import React from 'react';
import { TextField, Button, MenuItem, Typography } from '@mui/material';

function BaseForm({ variant }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const role = formData.get('role');
    const createPassword = formData.get('createPassword');
    const createAvatar = formData.get('createAvatar');
    console.log({ username, password, role, createPassword, createAvatar });

    // Add your form submission logic here (e.g., API call, state update, etc.)
  };

  const roleValue = variant === 'manager' ? 'customer' : '';

  const inputStyles = {
    color: '#fff', // Text color of input
    '& .MuiInputBase-input': {
      color: '#fff', 
    },
    '& .MuiOutlinedInput-root': {
      borderColor: '#fff',  
    },
    '& .MuiOutlinedInput-input': {
      '&::placeholder': {
        color: '#ccc',
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        padding: '20px',
        margin: '100px auto',
        color: '#fde8c9',
        borderRadius: '10px',
        backgroundColor: '#fff',
   }}
    >      <Typography variant="h1">Log in</Typography>
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        fullWidth
               InputProps={{ sx: inputStyles }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
      />
      <TextField
        name="role"
        select
        label="User"
        variant="outlined"
        defaultValue={roleValue}
        fullWidth
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
      </TextField>
      {/* 'register' form */}
      {variant === 'register' && (
        <>
          <TextField
            name="createPassword"
            label="Create Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="createAvatar"
            label="Create Avatar"
            variant="outlined"
            fullWidth
          />
        </>
      )}

      <Button type="submit" variant="contained" color="secondary">
        {variant === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  );
}

export default BaseForm;
