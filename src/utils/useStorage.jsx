import { useState } from 'react'

const useStorage = () => {
  const [userData, setUserData] = useState(null)

  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const load = (key) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  }

  const remove = (key) => {
    localStorage.removeItem(key)
  }

  const clear = () => {
    localStorage.clear()
  }

  const clearUserData = () => {
    remove('userData')
    setUserData(null)
  }

  const saveUserData = (userData) => {
    save('userData', userData)
    setUserData(userData)
  }

  // stores isVenueManager value from register form
  const loadUserData = () => {
    const userData = load('userData')
    setUserData(userData)
    return userData
  }
  const saveVenueManager = (venueManager) => {
    save('venueManager', venueManager);
  };

  const isUserLoggedIn = () => {
    return userData !== null
  }

  const getUserRole = () => {
    return userData?.role || 'customer'
  }

  const saveToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
  }

  const loadToken = () => {
    return localStorage.getItem('accessToken')
  }

  const saveApiKey = (apiKey) => {
    localStorage.setItem('apiKey', apiKey)
  }

  const loadApiKey = () => {
    return localStorage.getItem('apiKey')
  }
  return {
    saveUserData,
    saveApiKey,
    loadApiKey,
    loadUserData,
    isUserLoggedIn,
    saveToken,
    loadToken,
    getUserRole,
    clearUserData,
    remove,
    clear, 
    save,
    load,
    saveVenueManager
  }
}

export default useStorage
