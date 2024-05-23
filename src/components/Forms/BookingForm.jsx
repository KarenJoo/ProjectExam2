import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from '@mui/material'
import { createBooking } from '../../utils/bookingsApi'
import useStorage from '../../utils/useStorage'
import { createApiKey } from '../../utils/createApiKey'
import { AlertError } from '../Styles/Errors'



const BookingForm = ({ venueId, onSubmit, venueName, venueImage }) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [apiKey, setApiKey] = useState('')
  const [alertError, setAlertError] = useState(false)
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
    const accessToken = storage.loadToken('accessToken')
    if (!accessToken) {
      setAlertError(true)
      return
    }

    try {
      const bookingData = {
        dateFrom: checkInDate,
        dateTo: checkOutDate,
        guests: parseInt(guests),
        venueId: venueId,
        venueName: venueName,
        venueImage: venueImage,
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
        <Typography variant='body3'>Book your next stay at: {venueName}</Typography> 
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
          Book now
        </Button>
        {alertError && (
          <AlertError message="Only logged in customers can book a venue." />
        )}
      </CardContent>
    </Card>
  )
}

export default BookingForm
