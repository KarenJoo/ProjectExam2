import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--primary-color)',
        color: 'var(--secondary-color)',
        textAlign: 'center',
        padding: '20px 0',
        position: 'relative',
        width: '100%',
      }}
    >
      <Typography sx={{ fontSize: '12px' }}>
        Holidaze 2024 © All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
