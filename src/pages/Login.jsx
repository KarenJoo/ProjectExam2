import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BaseForm from '../components/TempForms/BaseForm'

function LoginPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        mb: 3,
        mt: 2,
        margin: '0 auto',
        alignItems: 'center',
        textAlign: 'center',
        '@media (min-width: 600px)': {
          flexDirection: 'column',
          maxWidth: '600px',
        },
      }}
    >
      <Box
        sx={{
          margin: '100px auto',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
        }}
      >
        <BaseForm variant='login' />
        <Box
          sx={{
            maxWidth: '700px',
            backgroundColor: '#fff',
            width: '84%',
            margin: '0px auto',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          <Typography
            variant='body1'
            sx={{ fontSize: '12px', color: 'primary', mt: 2 }}
          >
            If you don't have an account
          </Typography>
          <Link to='/register'>
            <Typography variant='body2' sx={{ color: 'primary', mt: 1 }}>
              Register here
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
