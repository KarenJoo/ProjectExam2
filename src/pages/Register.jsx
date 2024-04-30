import React from 'react'
import BaseForm from '../components/Forms/BaseForm'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import StyleSheet from './LoginRegister.module.css'

function RegisterPage() {
  return (
    <div className={StyleSheet.container}>
      <BaseForm variant='register'/>
      <Link to={`/login`} className={StyleSheet.link}>
        {' '}
        <Typography variant='h5'>Log in</Typography>
      </Link>
    </div>
  )
}

export default RegisterPage
