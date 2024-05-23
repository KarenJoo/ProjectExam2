import React from 'react'
import useStorage from '../../utils/useStorage'
import { useDispatch } from 'react-redux'
import { setVenueManager } from '../../storage/reducers/authReducer'
import { Box } from '@mui/material'

const Logout = () => {
  const { clearUserData, save } = useStorage()
  const dispatch = useDispatch();

  const handleLogout = () => {
    save('userLoggedIn', false);
    clearUserData()
    localStorage.removeItem('avatarUrl'); 
    dispatch(setVenueManager(false));
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
