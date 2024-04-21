import React, { useEffect, useState } from 'react';
import useStorage from '../utils/useStorage';
import { Typography } from '@mui/material';

const Profile = () => {
  const storage = useStorage();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadedUserData = storage.loadUserData();
    setUserData(loadedUserData);
    console.log('userdata:', loadedUserData);

    // Ensure that this effect runs only once on component mount
    // Provide an empty dependency array to the useEffect hook
  }, []); // Empty dependency array

  if (!userData) {
    return <div>Loading...</div>; // Handle loading state while data is being fetched
  }

  return (
    <div>
      <Typography variant='h2'>{userData.name}</Typography>
      <p>Avatar URL: {userData.avatar && userData.avatar.url}</p>
      <p>Venue Manager: {userData.venueManager ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Profile;
