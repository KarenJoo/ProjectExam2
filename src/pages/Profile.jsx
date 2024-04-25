import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import useStorage from '../utils/useStorage'

const Profile = () => {
  const {loadUserData} = useStorage();
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const getUserData = loadUserData()
    if (getUserData) {
      setUserData(getUserData)
    } else {
      console.error('Failed to load user data from local storage.')
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div>
            <div className="contentContainer">

      <ProfileLayout userData={userData} />
    </div>
    </div>
  )
}

export default Profile
