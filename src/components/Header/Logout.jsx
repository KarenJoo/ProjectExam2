import React from 'react'
import useStorage from '../../utils/useStorage'

const Logout = () => {
  const { clearUserData } = useStorage()

  const handleLogout = () => {
    clearUserData()
    window.location.href = '/login'
  }

  return (
    <div
      style={{ cursor: 'pointer', color: '#fde8c9', textDecoration: 'none' }}
      onClick={handleLogout}
    >
      Logout
    </div>
  )
}

export default Logout
