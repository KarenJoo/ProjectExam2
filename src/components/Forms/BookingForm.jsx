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
    <Card sx={{ '@media (max-width:600px)': { marginBottom: '20px' } }}>
      <CardContent>
        <Typography variant='body3'>Book your next stay</Typography>
        <TextField
          fullWidth
          label='Check-in Date'
          type='date'
          sx={{ marginBottom: '10px', marginTop: '20px' }}
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label='Check-out Date'
          type='date'
          sx={{ marginBottom: '20px' }}
          value={checkOutDate}
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
