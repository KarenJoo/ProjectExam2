import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError('Failed to get venues. Please try again later.'); 

      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    
    };
  }, [url]); 

  return { data, loading, error };
};

export default useFetch;