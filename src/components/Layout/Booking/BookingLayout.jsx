import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../utils/api'
import useStorage from '../../../utils/useStorage'
import { createApiKey } from '../../../utils/createApiKey'
import { Box, Button } from '@mui/material'
import BookingList from './BookingList'

const BookingLayout = () => {
  const [bookingVenues, setBookingVenues] = useState([])
  const storage = useStorage()
  const [error, setError] = useState(null)
  
 
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const accessToken = storage.loadToken('accessToken')
        const apiKey = await createApiKey(accessToken)

        const response = await fetch(
          `${API_BASE_URL}/venues?_owner=true&_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'X-Noroff-API-Key': apiKey,
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch booking venues')
        }
    


        const venuesData = await response.json();
        setBookingVenues(venuesData.data);
        const venueBookings = venuesData.data.map((venue) => ({
          ...venue,
          bookings: venue.bookings.map((booking) => ({
            ...booking,
            dateFrom: formatDate(booking.dateFrom),
            dateTo: formatDate(booking.dateTo),
          })),
        }));

        setBookingVenues(venueBookings);
      } catch (error) {
        console.error('Error fetching booking venues:', error);
        setError(error.message);
      }
    };

    fetchVenues()
  }, [])


  const handleSubmit = async () => {
    try {
      const accessToken = storage.loadToken('accessToken')

      if (!accessToken) {
        throw new Error('Access token not found')
      }
    } catch (error) {
      console.error('Failed to create venue:', error)
      alert('Failed to create venue')
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '80%',
        marginTop: '100px',
      }}
    >
      {/* Calendar */}
      <form
        onSubmit={handleSubmit}
        sx={{
          marginBottom: '20px',
          marginRight: { xs: '0', md: '20px' },
        }}
      >
        <Button type='submit' variant="contained">Book Venue</Button>
      </form>
      {/* Booking Venues */}
      <Box sx={{ width: '100%', maxWidth: '500px', height: 'auto', flex: 1 }}>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <BookingList bookings={bookingVenues} formatDate={formatDate} />
        )}
      </Box>
    </Box>
  )
}
export default BookingLayout
