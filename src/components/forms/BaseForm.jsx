import React from 'react'
import { TextField, Button, MenuItem, Typography } from '@mui/material'

function BaseForm({ variant }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')
    const role = formData.get('role')
    const createPassword = formData.get('createPassword')
    const createAvatar = formData.get('createAvatar')
    console.log({ username, password, role, createPassword, createAvatar })

    // Add your form submission logic here (e.g., API call, state update, etc.)
  }

  const roleValue = variant === 'manager' ? 'customer' : ''

  const inputStyles = {
    color: '#fff', // Text color of input
    '& .MuiInputBase-input': {
      color: '#fff',
      backgroundColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      borderColor: '#fff',
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
        margin: '100px auto',
        color: '#01333e',
        borderRadius: '10px',
        backgroundColor: '#ffffff90',
        marginBottom: '20px',
      }}
    >
      <Typography variant='h1'>
        {variant === 'login' ? 'Log in' : 'Register'}
      </Typography>

      {variant === 'login' && (
        <>
          <Typography variant='p'>Username</Typography>
          <TextField
            name='username'
            label='Username'
            variant='outlined'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='p'>Password</Typography>
          <TextField
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='p'>Set user role</Typography>
          <TextField
            name='role'
            select
            label='User'
            variant='outlined'
            defaultValue={roleValue}
            fullWidth
            InputProps={{ sx: inputStyles }}
          >
            <MenuItem value='customer'>Customer</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
          </TextField>
        </>
      )}

      {variant === 'register' && (
        <>
          <Typography variant='p'>Create Username</Typography>
          <TextField
            name='createUsername'
            label='Create Username'
            variant='outlined'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='p'>Email</Typography>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='p'>Create Password</Typography>
          <TextField
            name='createPassword'
            label='********'
            type='password'
            variant='outlined'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='p'>Profile Image URL</Typography>
          <TextField
            name='createAvatar'
            label='URL here..'
            variant='outlined'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='p'>Set user role</Typography>
          <TextField
            name='role'
            select
            label='User'
            variant='outlined'
            defaultValue={roleValue}
            fullWidth
            InputProps={{ sx: inputStyles }}
          >
            <MenuItem value='customer'>Customer</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
          </TextField>
        </>
      )}

      <Button type='submit' variant='contained' color='secondary'>
        {variant === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  )
}

export default BaseForm
