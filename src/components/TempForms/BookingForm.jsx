import CheckIcon from '@mui/icons-material/Check'
import {
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useAuth from '../../hooks/useAuth'
import { createBooking } from '../../utils/bookingsApi'
import useStorage from '../../utils/useStorage'
import { AlertError } from '../Styles/Errors'

const BookingForm = ({
  venueId,
  onSubmit,
  venueName,
  venueImage,
  bookingData,
}) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [alertError, setAlertError] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const storage = useStorage()
  const { isLoggedIn } = useAuth()

  const bookedDates = bookingData.map((booking) => {
    return {
      startDate: new Date(booking.dateFrom),
      endDate: new Date(booking.dateTo),
    }
  })

  const isDateBooked = (date) => {
    return bookedDates.some((bookedDate) => {
      return date >= bookedDate.startDate && date <= bookedDate.endDate
    })
  }

  const handleSubmit = async () => {
    const accessToken = storage.loadToken('accessToken')
    const apiKey = storage.loadApiKey()

    if (!isLoggedIn) {
      setAlertError('Only logged in customers can book a venue.')
      return
    } else console.log('Booking submitted')
    try {
    } catch (error) {
      console.error('Error creating booking:', error)
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

      const newBooking = await createBooking(accessToken, bookingData, apiKey)
      onSubmit(newBooking)
      setBookingSuccess(true)
      console.log('Registerd booking;', newBooking)
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '90%',
        maxWidth: '600px',
        mx: 'auto',
        mt: 4,
        p: 2,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant='body3'>
          Book your next stay at: {venueName}
        </Typography>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          placeholderText='Check-in Date'
          minDate={new Date()}
          filterDate={(date) => !isDateBooked(date)}
          className='date-picker'
          dateFormat='yyyy-MM-dd'
          customInput={<TextField fullWidth label='Check-in Date' />}
          style={{ marginBottom: '20px' }}
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          placeholderText='Check-out Date'
          minDate={
            checkInDate
              ? new Date(checkInDate).setDate(checkInDate.getDate() + 1)
              : new Date()
          }
          filterDate={(date) => !isDateBooked(date)}
          className='date-picker'
          dateFormat='yyyy-MM-dd'
          customInput={<TextField fullWidth label='Check-out Date' />}
        />

        <TextField
          fullWidth
          label='Number of Guests'
          type='number'
          sx={{ marginBottom: '20px', marginTop: '20px', maxWidth: '300px' }}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <Button variant='contained' fullWidth onClick={handleSubmit}>
          Book now
        </Button>
        {alertError && <AlertError message={alertError} />}
        {bookingSuccess && (
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            sx={{ marginTop: '10px' }}
          >
            Booking successful!
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default BookingForm
