import React, { useEffect, useState } from 'react';
import useStorage from '../utils/useStorage';
import { Typography } from '@mui/material';

const Profile = () => {
  const storage = useStorage();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = storage.loadUserData();
    if (getUserData) {
      setUserData(getUserData);
      console.log('User data loaded:', getUserData);
    } else {
      console.error('Failed to load user data from local storage.');
    }
  }, []); 

  if (!userData) {
    return <div>Loading...</div>;
  }

  console.log('Avatar URL:', userData.avatar && userData.avatar.url);

  return (
    <div>
      <Typography variant='h1'>{userData.name || 'Unknown User'}</Typography>
      {userData.avatar && (
        <img
          src={userData.avatar.url}
          alt={userData.name || 'User Image'}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          onLoad={() => console.log('Image loaded successfully')}
          onError={(e) => console.error('Image failed to load:', e)}
        />
      )}
      <Typography variant='h1'>Venue Manager: {userData.venueManager ? 'Yes' : 'No'}</Typography>
    </div>
  );
};

export default Profile;
