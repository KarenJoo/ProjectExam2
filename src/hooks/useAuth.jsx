import { useState, useEffect } from 'react'
import useStorage from '../utils/useStorage'

const useAuth = () => {
  const [isVenueManager, setIsVenueManager] = useState(false)
  const { loadUserData } = useStorage()

  useEffect(() => {
    const storedUserData = loadUserData()
    const venueManager = storedUserData?.venueManager || false 

    setIsVenueManager(venueManager)
  }, [])

  return { isVenueManager }
}

export default useAuth
