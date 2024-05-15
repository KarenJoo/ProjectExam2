import React from 'react'
import useStorage from '../../utils/useStorage'
import { useDispatch } from 'react-redux'
import { setVenueManager } from '../../storage/reducers/authReducer'

const Logout = () => {
  const { clearUserData, save } = useStorage()
  const dispatch = useDispatch();

  const handleLogout = () => {
    save('userLoggedIn', false);
    clearUserData()
    dispatch(setVenueManager(false));
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
