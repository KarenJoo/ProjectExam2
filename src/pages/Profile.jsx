import React, { useEffect, useState } from 'react';
import ProfileLayout from '../components/Layout/ProfileLayout';
import useStorage from '../utils/useStorage';
import { API_URL } from '../utils/api';

const Profile = () => {
  const { loadUserData, loadToken } = useStorage();
  const [userData, setUserData] = useState(null);
  const [venuesData, setVenuesData] = useState(null); // State to hold the venues data
  const [venuesLoading, setVenuesLoading] = useState(false);
  const [venuesError, setVenuesError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      const userToken = loadToken();
      const userProfile = await loadUserData();

      if (!userToken) {
        throw new Error('Access token not found');
      }

      if (!userProfile) {
        throw new Error('User profile not found');
      }

      setUserData(userProfile);
      setVenuesLoading(true);

try {
        const url = `${API_URL}/profiles/${userProfile.name}/venues`;
        const options = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }


        const data = await response.json();
        setVenuesData(data);
        setVenuesError(null);
      } catch (error) {
        setVenuesError(error.message);
      } finally {
        setVenuesLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contentContainer">
      {venuesLoading ? (
        <div>Loading venues...</div>
      ) : venuesError ? (
        <div>Error: {venuesError}</div>
      ) : (
        <ProfileLayout userData={userData} venuesData={venuesData} />
      )}
    </div>
  );
};

export default Profile;
