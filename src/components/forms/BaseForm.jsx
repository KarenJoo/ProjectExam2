import React, { useState } from 'react'
import { TextField, Button, MenuItem, Typography } from '@mui/material'
import { registerUser } from '../../utils/registerFetch'

const BaseForm = ({ variant }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: variant === 'manager' ? 'manager' : 'customer',
    createPassword: '',
    createAvatar: '',
    createUsername: '',
    email: '',
    avatarURL: '',
    avatarAlt: '',
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const inputErrors = {}

    // Validate Username
    if (!formData.username || !/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      inputErrors.username =
        'Username must only contain letters, numbers, and underscores'
    }

    // Validate Password
    if (!formData.password || formData.password.length < 8) {
      inputErrors.password = 'Password must be at least 8 characters long'
    }

    // validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@stud\.noroff\.no$/
    if (!emailRegex.test(formData.email)) {
      inputErrors.email = 'Invalid email format (e.g., example@stud.noroff.no)'
    }

    // Validate Avatar URL
    if (formData.avatarUrl && !isValidUrl(formData.avatarUrl)) {
      inputErrors.avatarUrl = 'Please enter a valid URL for the avatar'
    }

    // Validate Alt Text
    if (formData.avatarUrl && formData.avatarAlt.length > 120) {
      inputErrors.avatarAlt = 'Alt text must be less than 120 characters'
    }

    if (formData.createUsername.length < 3) {
      inputErrors.createUsername = 'Username must be at least 3 characters'
    }
    if (formData.createPassword.length < 8) {
      inputErrors.createPassword = 'Password must be at least 8 characters'
    }
    setErrors(inputErrors)
    return Object.keys(inputErrors).length === 0
  }
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const registeredUser = await registerUser(formData)
        console.log('User registered successfully:', registeredUser)
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error('Registration failed:', error.message)
        // Handle registration error (e.g., display error message to user)
      }
    }
  }

  const { createUsername, createPassword, email, createAvatar, role } = formData
  const {
    createUsername: usernameError,
    createPassword: passwordError,
    email: emailError,
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
        {variant === 'login' ? 'Log in' : 'Register'}
      </Typography>

      <TextField
        name='createUsername'
        label='Create Username'
        variant='filled'
        fullWidth
        value={createUsername}
        onChange={handleInputChange}
        error={!usernameError}
        helperText={usernameError}
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
        error={!emailError}
        helperText={emailError}
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
        error={!passwordError}
        helperText={passwordError}
        InputProps={{ sx: inputStyles }}
      />

      {variant === 'register' && (
        <>
          <Typography variant='subtitle1' style={{ marginTop: '20px' }}>
            Profile Image
          </Typography>
          <TextField
            name='createAvatar'
            label='URL here..'
            variant='filled'
            fullWidth
            value={createAvatar}
            onChange={handleInputChange}
            InputProps={{ sx: inputStyles }}
          />
        </>
      )}

      <TextField
        name='role'
        select
        label='User Role'
        variant='filled'
        fullWidth
        value={role}
        onChange={handleInputChange}
        error={!errors.role}
        helperText={errors.role}
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
        {variant === 'login' ? 'Login' : 'Register'}
      </Button>
    </form>
  )
}

export default BaseForm
