import React, { useState } from 'react'
import { TextField, Button, MenuItem, Typography } from '@mui/material'
import { registerUser, loginUser } from '../../utils/registerFetch'
import useStorage from '../../utils/useStorage'

const BaseForm = ({ variant }) => {
  const isRegister = variant === 'register'
  const storage = useStorage()

  const [formData, setFormData] = useState({
    createUsername: '',
    createPassword: '',
    email: '',
    avatarUrl: '',
    venueManager: true,
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const inputErrors = {}

    if (isRegister && !formData.createUsername) {
      inputErrors.createUsername = 'Create Username is required'
    }

    if (!formData.createPassword) {
      inputErrors.createPassword = 'Create Password is required'
    }

    if (!formData.email) {
      inputErrors.email = 'Email is required'
    }

    setErrors(inputErrors)
    return Object.keys(inputErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const {
          createUsername,
          email,
          createPassword,
          avatarUrl,
          venueManager,
        } = formData

        if (isRegister) {
          const registerData = {
            name: createUsername,
            email,
            password: createPassword,
            avatar: {
              url: avatarUrl,
            },
            venueManager,
          }

          const registeredUser = await registerUser(registerData)
          console.log('User registered successfully:', registeredUser)

          storage.saveUserData(registeredUser.data)
        } else {
          const loggedInUser = await loginUser({
            email,
            password: createPassword,
          })

          if (loggedInUser.data.accessToken) {
            // Save logged-in user data to local storage
            storage.saveToken(loggedInUser.data.accessToken)
            storage.saveUserData({
              username: loggedInUser.data.name,
              email: loggedInUser.data.email,
              avatarUrl: loggedInUser.data.avatar.url,
              venueManager: loggedInUser.data.venueManager,
            })

            console.log('Logged In User:', loggedInUser.data)

            // Redirect to profile page (replace '/profile' with your desired route)
            window.location.href = '/register'
          } else {
            alert('Login failed. Please check your credentials.')
          }
        }
      } catch (error) {
        console.error('Registration/Login failed:', error.message)
        alert('Registration/Login failed. Please try again.')
      }
    }
  }

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
