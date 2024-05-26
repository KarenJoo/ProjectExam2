import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout, setVenueManager } from '../../storage/reducers/authReducer'
import useStorage from '../../utils/useStorage'

const Logout = () => {
  const { clearUserData, save, clearApiKey, clearToken } = useStorage()
  const dispatch = useDispatch()

  const handleLogout = () => {
    clearUserData()
    save('userLoggedIn', false)
    dispatch(logout())
    localStorage.removeItem('avatarUrl')
    dispatch(setVenueManager(false))
    clearApiKey()
    clearToken()
    window.location.href = '/login'
  }

  return (
    <Box
      style={{ cursor: 'pointer', color: '#fde8c9', textDecoration: 'none' }}
      onClick={handleLogout}
    >
      Logout
    </Box>
  )
}

export default Logout
