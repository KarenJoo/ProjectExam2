import { useState, useEffect } from 'react'

const useAuth = () => {
  const [isVenueManager, setIsVenueManager] = useState(false)

  useEffect(() => {
    // Retrieve venue manager status from local storage
    const venueManager = localStorage.getItem('venueManager')

    if (venueManager === 'true') {
      setIsVenueManager(true)
    } else {
      setIsVenueManager(false)
    }
  }, []) 

  return { isVenueManager }
}

export default useAuth
