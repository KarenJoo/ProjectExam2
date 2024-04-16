import React from 'react'
import BaseForm from '../components/forms/BaseForm'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import StyleSheet from './LoginRegister.module.css'

function RegisterPage() {
  return (
    <div className={StyleSheet.container}>
      <BaseForm variant='register' />
      <Typography variant='h5'>If you don't have an account</Typography>
      <Link to={`/register`} className={StyleSheet.link}>
        {' '}
        <Typography variant='h5'>Register here</Typography>
      </Link>
    </div>
  )
}

export default RegisterPage
