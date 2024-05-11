import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, TextField, Button } from '@mui/material'
import { createBooking } from '../../utils/bookingsApi'
import useStorage from '../../utils/useStorage'
import { createApiKey } from '../../utils/createApiKey'

const BookingForm = ({ venueId, onSubmit }) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [apiKey, setApiKey] = useState('')
  const storage = useStorage()

  useEffect(() => {
    async function fetchApiKey() {
      const accessToken = storage.loadToken('accessToken')
      if (accessToken) {
        const key = await createApiKey(accessToken)
        setApiKey(key)
      }
    }
    fetchApiKey()
  }, [])

  const handleSubmit = async () => {
    try {
      const bookingData = {
        dateFrom: checkInDate,
        dateTo: checkOutDate,
        guests: parseInt(guests),
        venueId: venueId,
      }


      const accessToken = storage.loadToken('accessToken')

      const newBooking = await createBooking(accessToken, bookingData, apiKey)
      onSubmit(newBooking)
      console.log('new;', newBooking)

    } catch (error) {
      console.error('Error creating booking:', error)
      
    }
    
  }
  
  return (
    <Card sx={{ '@media (max-width:600px)': { marginBottom: '20px' } }}>
      <CardContent>
        <Typography variant='body3'>Book your next stay</Typography>
        <TextField
          fullWidth
          label='Check-in Date'
          type='date'
          sx={{ marginBottom: '10px', marginTop: '20px' }}
          value={checkInDate || ''}
          onChange={(e) => setCheckInDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label='Check-out Date'
          type='date'
          sx={{ marginBottom: '20px' }}
          value={checkOutDate || ''}
          onChange={(e) => setCheckOutDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label='Number of Guests'
          type='number'
          sx={{ marginBottom: '20px' }}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <Button variant='contained' fullWidth onClick={handleSubmit}>
          Book Venue
        </Button>
      </CardContent>
    </Card>
  )
}

export default BookingForm
