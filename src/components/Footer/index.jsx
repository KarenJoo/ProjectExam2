import React from 'react'
import Typography from '@mui/material/Typography'
import StyleSheet from './Footer.module.css'

const Footer = () => {
  return (
    <div>
      <Typography className={StyleSheet.footerText}>
        Holidaze 2024 © All rights reserved.
      </Typography>
    </div>
  )
}

export default Footer
