import React from 'react'
import useStorage from '../../utils/useStorage'

const Logout = () => {
  const { clearUserData } = useStorage();

  const handleLogout = () => {
    clearUserData()

    window.location.href = '/login'
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
