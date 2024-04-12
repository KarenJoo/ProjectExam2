import React from 'react'
import Navbar from '../Header/index'
import { ThemeProvider } from '@mui/material'
import theme from '../../themes/muiTheme'

export default function Layout(props) {
  const { children } = props

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        {children}
      </ThemeProvider>
    </>
  )
}
