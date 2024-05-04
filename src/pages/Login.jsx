import React from 'react'
import { Typography } from '@mui/material'
import StyleSheet from './LoginRegister.module.css'
import { Link } from 'react-router-dom'
import BaseForm from '../components/forms/BaseForm'

function LoginPage() {
  return (
    <div className={StyleSheet.container}>
      <BaseForm variant='login' />
      <Typography variant='h5'>If you don't have an account</Typography>
      <Link to='/register' className={StyleSheet.link}>
        <Typography variant='h5'>Register here</Typography>
      </Link>
    </div>
  )
}

export default LoginPage
