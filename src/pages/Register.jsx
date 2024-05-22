import React from 'react'
import BaseForm from '../components/Forms/BaseForm'
import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'

function RegisterPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        mb: 3,
        mt: 2,
        margin: '100px auto',
        alignItems: 'center',
        textAlign: 'center',
        '@media (min-width: 600px)': {
          flexDirection: 'column',
          maxWidth: '600px',
        },
      }}
    >
      <BaseForm variant='register' />

      <Link
        to='/login'
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '16px',
        }}
      >
        <LoginIcon
          sx={{ color: 'var(--secondary-color)', marginRight: '8px' }}
        />
        <Typography variant='body2' sx={{ color: 'var(--secondary-color)' }}>
          Log in
        </Typography>
      </Link>
    </Box>
  )
}

export default RegisterPage
