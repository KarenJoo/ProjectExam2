import React from 'react'
import Navbar from '../Header'

export default function Layout(props) {
  const { children } = props

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
