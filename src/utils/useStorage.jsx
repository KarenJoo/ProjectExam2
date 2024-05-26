import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVenueManager } from '../storage/reducers/authReducer'

const useStorage = () => {
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  const isVenueManager = useSelector((state) => state.auth.isVenueManager)

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
    remove('isVenueManager')
    setUserData(null)
  }

  const saveUserData = (userData) => {
    if (userData) {
      save('userData', userData)
      setUserData(userData)
      save('isVenueManager', userData.isVenueManager)
    }
  }

  // stores isVenueManager value, name, from register form
  const loadUserData = useCallback(() => {
    const loadedUserData = load('userData');
    if (loadedUserData) {
      setUserData(loadedUserData);
      dispatch(setVenueManager(loadedUserData.isVenueManager));
    }
    return loadedUserData;
  }, [dispatch]);


  const saveVenueManager = (venueManager) => {
    save('venueManager', venueManager)
  }

  const isUserLoggedIn = () => {
    return userData !== null
  }

  const getUserRole = () => {
    return isVenueManager ? 'isVenueManager' : 'customer'
  }

  const saveToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
  }

  const loadToken = () => {
    return localStorage.getItem('accessToken')
  }

  const saveApiKey = (apiKey) => {
    localStorage.setItem('apiKey', apiKey);
  };

  const loadApiKey = () => {
    return localStorage.getItem('apiKey');
  };

  
  

  useEffect(() => {
    loadUserData()
    const storedUserData = load('userData');
    if (storedUserData) {
      setUserData(storedUserData)
    }
  }, [])

  

  return {
    saveUserData,
    
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
    saveVenueManager,
    saveApiKey,
    loadApiKey,
  }
}

export default useStorage
