import React from 'react'
import Navbar from '../Header/index'
import { ThemeProvider } from '@mui/material'
import theme from '../../themes/muiTheme'
import Footer from '../Footer'

export default function Layout(props) {
  const { children } = props

  return (
    <>
      <ThemeProvider theme={theme}>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </>
  )
}
