import React, { useEffect, useState } from 'react'
import Calendar from '../../Booking/Calendar'
import { API_BASE_URL } from '../../../utils/api'
import dayjs from 'dayjs'
import useStorage from '../../../utils/useStorage'
import { createApiKey } from '../../../utils/createApiKey'

const BookingLayout = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [bookingVenues, setBookingVenues] = useState([])
  const storage = useStorage();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const accessToken = storage.loadToken('accessToken');
        const apiKey = await createApiKey(accessToken);

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${storage.loadToken('accessToken')}`, 
            'X-Noroff-API-Key': apiKey, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch booking venues')
        }
        const venuesData = await response.json()
        setBookingVenues(venuesData.data)
      } catch (error) {
        console.error('Error fetching booking venues:', error)
        setError(error.message); 
      }
    }
    fetchVenues()
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const handleSubmit = async () => {
    try {
      const accessToken = storage.loadToken('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Add your logic for handling form submission here
      
    } catch (error) {
      console.error('Failed to create venue:', error);
      alert('Failed to create venue');
    }
  }
  
  return (
    <div className="contentContainer">
      <form onSubmit={handleSubmit}>
        <Calendar value={selectedDate} onChange={handleDateChange} />
        <button type="submit">Book Venue</button>
      </form>

      {error ? (
        <div>Error: {error}</div> // Display error message if an error occurred
      ) : (
        <ul>
          {bookingVenues.map((venue) => (
            <li key={venue.id}>
              <div>
                <strong>{venue.name}</strong>
              </div>
              <div>{venue.description}</div>
              {/* Additional venue details can be displayed here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingLayout;