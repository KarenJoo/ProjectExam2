import React, { useState } from 'react'
import { TextField, Button, MenuItem, Typography } from '@mui/material'
import {registerUser, loginUser } from '../../utils/registerFetch'
import useStorage from '../../utils/useStorage'
import { createApiKey } from '../../utils/createApiKey'

const BaseForm = ({ variant }) => {
    const isRegister = variant === 'register';
    const storage = useStorage();
  
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      email: '',
      avatarUrl: '',
      venueManager: true,
    });
  
    const [errors, setErrors] = useState({});
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
    try {
      if (isRegister) {
        const registeredUser = await registerUser(formData);
        console.log('Registered User:', registeredUser);
        // Handle registration success
      } else {
        const loggedInUser = await loginUser(formData);
        console.log('Logged In User:', loggedInUser);
        // Handle login success
        if (loggedInUser.accessToken) {
          const apiKeyData = await createApiKey(loggedInUser.accessToken);
          const apiKey = apiKeyData.key;
          storage.save('apiKey', apiKey);
          storage.save('userData', loggedInUser);
          // Redirect to profile page or desired location after successful login
        }
      }
    } catch (error) {
      console.error('Registration/login failed:', error.message);
      // Handle registration/login failure
    }
  };

  const { createUsername, createPassword, email, avatarUrl, venueManager } =
    formData
  const {
    email: emailError,
    createUsername: usernameError,
    createPassword: createPasswordError,
  } = errors

  const inputStyles = {
    color: '#01333e',
    '& .MuiOutlinedInput-root': {
      borderColor: '#000',
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff',
      },
    },
    '& .MuiInputBase-input': {
      color: '#000',
      backgroundColor: '#fff',
      fontSize: '12px',
    },
    '& .MuiOutlinedInput-input': {
      '&::placeholder': {
        color: '#ccc',
      },
    },
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        padding: '20px',
        margin: '30px auto',
        color: '#01333e',
        borderRadius: '10px',
        backgroundColor: '#fff',
        marginBottom: '50px',
        textAlign: 'left',
      }}
    >
      <Typography variant='h1' style={{ color: '#01333e' }}>
        {isRegister ? 'Register' : 'Log in'}
      </Typography>

      {isRegister && (
        <>
          <TextField
            name='createUsername'
            label='Create Username'
            variant='filled'
            fullWidth
            value={createUsername}
            onChange={handleInputChange}
            error={!!usernameError}
            helperText={usernameError}
            InputProps={{ sx: inputStyles }}
          />

          <TextField
            name='createPassword'
            label='Create Password'
            type='password'
            variant='filled'
            fullWidth
            value={createPassword}
            onChange={handleInputChange}
            error={!!createPasswordError}
            helperText={createPasswordError}
            InputProps={{ sx: inputStyles }}
          />

          <TextField
            name='email'
            label='Email'
            type='email'
            variant='filled'
            fullWidth
            value={email}
            onChange={handleInputChange}
            error={!!emailError}
            helperText={emailError}
            InputProps={{ sx: inputStyles }}
          />

          <TextField
            name='avatarUrl'
            label='Avatar URL'
            variant='filled'
            fullWidth
            value={avatarUrl}
            onChange={handleInputChange}
            InputProps={{ sx: inputStyles }}
          />
        </>
      )}

      {!isRegister && (
        <>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='filled'
            fullWidth
            value={email}
            onChange={handleInputChange}
            error={!!emailError}
            helperText={emailError}
            InputProps={{ sx: inputStyles }}
          />

          <TextField
            name='createPassword'
            label='Password'
            type='password'
            variant='filled'
            fullWidth
            value={createPassword}
            onChange={handleInputChange}
            error={!!createPasswordError}
            helperText={createPasswordError}
            InputProps={{ sx: inputStyles }}
          />
        </>
      )}

      <TextField
        name='venueManager'
        select
        label='User role'
        variant='filled'
        fullWidth
        value={venueManager ? 'manager' : 'customer'}
        onChange={(e) =>
          setFormData({
            ...formData,
            venueManager: e.target.value === 'manager',
          })
        }
        error={!errors.venueManager}
        helperText={errors.venueManager}
        InputProps={{ sx: inputStyles }}
      >
        <MenuItem value='customer'>Customer</MenuItem>
        <MenuItem value='manager'>Manager</MenuItem>
      </TextField>

      <Button
        type='submit'
        variant='contained'
        color='secondary'
        style={{ marginTop: '20px' }}
      >
        {isRegister ? 'Register' : 'Login'}
      </Button>
    </form>
  )
}

export default BaseForm
