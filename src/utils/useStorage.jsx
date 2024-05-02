import { useState } from 'react'

const useStorage = () => {
  const [userData, setUserData] = useState(null)

  // const save = (key, value) => {
  //   localStorage.setItem(key, JSON.stringify(value))
  // }

  // const load = (key) => {
  //   const value = localStorage.getItem(key)
  //   return JSON.parse(value)
  // }

  // const remove = (key) => {
  //   localStorage.removeItem(key)
  // }

  // const clear = () => {
  //   localStorage.clear()
  // }

  const clearUserData = () => {
    localStorage.removeItem('userData')
    setUserData(null)
  }

  const saveUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setUserData(userData);
  }

  // stores isVenueManager value from register form
  const loadUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    setUserData(userData)
    return userData;
  }

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
  }
}

export default useStorage
