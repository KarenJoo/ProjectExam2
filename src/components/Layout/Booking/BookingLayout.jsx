import React, { useEffect, useState } from 'react'
import Calendar from '../../Booking/Calendar'
import { API_BASE_URL } from '../../../utils/api'
import dayjs from 'dayjs'
import useStorage from '../../../utils/useStorage'
import { createApiKey } from '../../../utils/createApiKey'
import { Grid, Typography, ListItemText } from '@mui/material'

const BookingLayout = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [bookingVenues, setBookingVenues] = useState([])
  const storage = useStorage()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const accessToken = storage.loadToken('accessToken')
        const apiKey = await createApiKey(accessToken)

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${storage.loadToken('accessToken')}`,
            'X-Noroff-API-Key': apiKey,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch booking venues')
        }
        const venuesData = await response.json()
        setBookingVenues(venuesData.data || [])

        console.log('Venues Data:', venuesData)
      } catch (error) {
        console.error('Error fetching booking venues:', error)
        setError(error.message)
      }
    }
    fetchVenues()
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
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

  return (
    <div className='contentContainer'>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <form onSubmit={handleSubmit}>
            <Calendar value={selectedDate} onChange={handleDateChange} />
            <button type='submit'>Book Venue</button>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5' marginBottom='10px'>
            Booking Venues
          </Typography>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <ul>
              {bookingVenues.map((venue) => (
                <ListItemText key={venue.id}>
                  <div>
                    <strong>{venue.name}</strong>
                  </div>
                  <div>{venue.description}</div>
                </ListItemText>
              ))}
            </ul>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default BookingLayout
