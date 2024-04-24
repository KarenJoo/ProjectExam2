import React from 'react'
import useStorage from '../../utils/useStorage'

const Logout = () => {
  const { clear } = useStorage();

  const handleLogout = () => {
    clear()

    window.location.href = '/login'
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
