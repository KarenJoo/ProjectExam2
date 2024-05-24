import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#01333e',
        color: '#fde8c9',
        textAlign: 'center',
        padding: '20px 0',
        width: '100%',
        mt: 'auto',
      }}
    >
      <Typography sx={{ fontSize: '12px' }}>
        Holidaze 2024 © All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
