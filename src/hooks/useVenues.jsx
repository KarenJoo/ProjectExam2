import { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';

const useVenuesData = (username, token) => {
  const [venuesData, setVenuesData] = useState(null);
  const [venuesLoading, setVenuesLoading] = useState(false);
  const [venuesError, setVenuesError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const url = `${API_URL}/profiles/${username}/venues`;
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setVenuesLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVenuesData(data);
      } catch (error) {
        setVenuesError(error.message);
      } finally {
        setVenuesLoading(false);
      }
    };

    fetchVenues();
  }, [username, token]);

  return { venuesData, venuesLoading, venuesError };
};

export default useVenuesData;
