import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import useStorage from '../utils/useStorage'

const Profile = () => {
  const storage = useStorage()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const getUserData = storage.loadUserData()
    if (getUserData) {
      setUserData(getUserData)
    } else {
      console.error('Failed to load user data from local storage.')
    }
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>User Profile</h1>
      <ProfileLayout userData={userData} />
    </div>
  )
}

export default Profile
