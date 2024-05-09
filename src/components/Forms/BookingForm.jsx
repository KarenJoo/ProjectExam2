import React, { useState } from 'react'
import { Card, CardContent, Typography, TextField, Button } from '@mui/material'

const BookingForm = ({ onSubmit }) => {
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [guests, setGuests] = useState(1)

  const handleSubmit = () => {
    onSubmit({ checkInDate, checkOutDate, guests })
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Create Booking</Typography>
        <TextField
          label='Check-in Date'
          type='date'
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Check-out Date'
          type='date'
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label='Number of Guests'
          type='number'
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <Button variant='contained' onClick={handleSubmit}>
          Book Venue
        </Button>
      </CardContent>
    </Card>
  )
}

export default BookingForm
