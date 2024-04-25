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

  const loadUserData = () => {
    const userData = load('userData')
    if (userData) {
      setUserData(userData)
    }
    return userData
  }

  const isUserLoggedIn = () => {
    return userData !== null
  }

  const getUserRole = () => {
    return userData?.role || 'customer'
  }

  // stores token
  const saveToken = (accessToken) => {
    save('accessToken', accessToken)
  }

  // retrieves token
  const loadToken = () => {
    return load('accessToken')
  }

  return {
    saveUserData,
    loadUserData,
    isUserLoggedIn,
    remove,
    clear,
    saveToken,
    loadToken,
    getUserRole,
    clearUserData,
    load,
    save,
  }
}

export default useStorage
