import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import useStorage from '../utils/useStorage'

const Profile = () => {
  const {loadUserData} = useStorage();
  const [userData, setUserData] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await loadUserData();
        if (userData) {
          setUserData(userData);
        } else {
          console.error('Failed to load user data from local storage.');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    fetchData(); // Call fetchData function directly in useEffect
  }, [loadUserData]); // Effect runs when loadUserData function reference changes

  if (!userData) {
    return <div>Loading...</div>;
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
