import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import StyleSheet from './Homepage.module.css'

const ButtonUsage = () => {
  return (
    <Button variant='outlined' color='primary'>
      Book
    </Button>
  )
}

const Homepage = () => {
  return (
    <div className={StyleSheet.container}>
      <Typography variant='h1'>Holidaze</Typography>
      <Typography variant='h5'>Book and dayze away</Typography>
      <ButtonUsage />
    </div>
  )
}

export default Homepage
