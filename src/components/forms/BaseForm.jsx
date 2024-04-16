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
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Username
          </Typography>
          <TextField
            name='username'
            label='Username'
            variant='filled'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Password
          </Typography>
          <TextField
            name='password'
            label='Password'
            type='password'
            variant='filled'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Set user role
          </Typography>
          <TextField
            name='role'
            select
            label='User'
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

      {variant === 'register' && (
        <>
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Create Username
          </Typography>
          <TextField
            name='createUsername'
            label='Create Username'
            variant='filled'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Email
          </Typography>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='filled'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Create Password
          </Typography>
          <TextField
            name='createPassword'
            label='********'
            type='password'
            variant='filled'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Profile Image URL
          </Typography>
          <TextField
            name='createAvatar'
            label='URL here..'
            variant='filled'
            fullWidth
            InputProps={{ sx: inputStyles }}
          />
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Set user role
          </Typography>
          <TextField
            name='role'
            select
            label='User'
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
