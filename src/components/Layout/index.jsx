import React from 'react'
import Navbar from '../Header'
import { ThemeProvider } from '@emotion/react'
import theme from '../../themes/index'

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
