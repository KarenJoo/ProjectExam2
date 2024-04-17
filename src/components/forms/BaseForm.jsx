import React, { useState } from 'react'
import { TextField, Button, MenuItem, Typography } from '@mui/material'
import { registerUser } from '../../utils/registerFetch'

function BaseForm({ variant }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(
    variant === 'manager' ? 'manager' : 'customer'
  )
  const [createPassword, setCreatePassword] = useState('')
  const [createAvatar, setCreateAvatar] = useState('')
  const [createUsername, setCreateUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log({
      username,
      password,
      role,
      createUsername,
      email,
      createPassword,
      createAvatar,
    })

    const userData = {
      name: variant === 'register' ? createUsername : username,
      email: email,
      password: variant === 'register' ? createPassword : password,
      avatar: {
        url: createAvatar || '',
        alt: '',
      },
      venueManager: role === 'manager',
    }

    try {
      const registeredUser = await registerUser(userData)
      console.log('User registered successfully:', registeredUser)
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error('Registration failed:', error.message)
      // Handle registration error (e.g., display error message to user)
    }
  }

  const roleValue = variant === 'manager' ? 'manager' : 'customer'
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
        {variant === 'login' ? 'Log in' : 'Register'}
      </Typography>

      {variant === 'login' && (
        <>
          <TextField
            name='username'
            label='Username'
            variant='filled'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ sx: inputStyles }}
          />
          <div style={{ marginBottom: '10px' }}></div>

          <TextField
            name='password'
            label='Password'
            type='password'
            variant='filled'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ sx: inputStyles }}
          />
          <div style={{ marginBottom: '10px' }}></div>
          <TextField
            name='role'
            select
            label='User'
            variant='filled'
            defaultValue={roleValue}
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            InputProps={{ sx: inputStyles }}
          >
            <MenuItem value='customer'>Customer</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
          </TextField>
          <div style={{ marginBottom: '30px' }}></div>
        </>
      )}

      {variant === 'register' && (
        <>
          <div style={{ marginBottom: '10px' }}></div>

          <TextField
            name='createUsername'
            label='Create Username'
            variant='filled'
            fullWidth
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
            InputProps={{ sx: inputStyles }}
          />
          <div style={{ marginBottom: '10px' }}></div>

          <TextField
            name='email'
            label='Email'
            type='email'
            variant='filled'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ sx: inputStyles }}
          />
          <div style={{ marginBottom: '10px' }}></div>

          <TextField
            name='createPassword'
            label='Create Password'
            type='password'
            variant='filled'
            fullWidth
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Profile Image
          </Typography>
          <TextField
            name='createAvatar'
            label='URL here..'
            variant='filled'
            fullWidth
            value={createAvatar}
            onChange={(e) => setCreateAvatar(e.target.value)}
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Set user role
          </Typography>
          <TextField
            name='role'
            select
            variant='filled'
            defaultValue={roleValue}
            fullWidth
            InputProps={{ sx: inputStyles }}
          >
            <MenuItem value='customer'>Customer</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
          </TextField>
        </>
      )}

      <Button
        type='submit'
        variant='contained'
        color='secondary'
        style={{ marginTop: '20px' }}
      >
        {variant === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  )
}

export default BaseForm
