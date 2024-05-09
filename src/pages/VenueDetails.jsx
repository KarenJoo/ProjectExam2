import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VENUES_URL } from '../utils/api'
import { Card, CardContent, Typography } from '@mui/material'
import styles from '../components/VenueCard.module.css'
import BookingForm from '../components/Forms/BookingForm'

const VenueDetails = () => {
  const { id } = useParams()
  const API_URL = `${VENUES_URL}/${id}?_owner=true&_bookings=true`
  const [venueDetails, setVenueDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch venue details')
        }
        const data = await response.json()
        setVenueDetails(data.data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchVenueDetails()

    return () => {
      setVenueDetails(null)
      setLoading(true)
      setError(null)
    }
  }, [API_URL])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: Unable to load venue details.</div>
  }

  if (!venueDetails) {
    return <div>Error: Venue details not found.</div>
  }

  const {
    name,
    description,
    media,
    price,
    maxGuests,
    meta,
    location,
    rating,
    owner,
    bookings,
  } = venueDetails

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Function to handle booking submission
  const handleBookingSubmit = () => {
    console.log('Booking submitted')
  }

  const wifiAvailable = meta?.wifi ? 'Yes' : 'No'
  const parkingAvailable = meta?.parking ? 'Yes' : 'No'
  const breakfastIncluded = meta?.breakfast ? 'Yes' : 'No'
  const petsAllowed = meta?.pets ? 'Allowed' : 'No'

  const address = location
    ? `${location.address}, ${location.city}, ${location.country}`
    : 'Address not available'

  return (
    <div className={styles.container}>
      <Card className={styles.venueCard} style={{ marginBottom: '100px' }}>
        <div className={styles.imageContainer}>
          <img src={media && media.length > 0 ? media[0].url : ''} alt={name} />
        </div>
        <CardContent>
          <Typography variant='h2'>{name}</Typography>
          <Typography variant='body1'>{description}</Typography>
          <Typography variant='body2'>
            Address: {address} | Max Guests: {maxGuests}
          </Typography>
          <Typography variant='body2'>Rating: {rating}</Typography>
          <Typography variant='body2'>
            Owner: {owner && owner.name ? owner.name : 'Unknown Owner'}
          </Typography>
          <div className={styles.contentList}>
            <Typography key='wifi'>WiFi: {wifiAvailable}</Typography>
            <Typography key='parking'>Parking: {parkingAvailable}</Typography>
            <Typography key='breakfast'>
              Breakfast: {breakfastIncluded}
            </Typography>
            <Typography key='pets'>Pets: {petsAllowed}</Typography>
          </div>
          <BookingForm onSubmit={handleBookingSubmit} />
          <Typography variant='h3'>Bookings:</Typography>
          <div className={styles.cardContainer}>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id} className={styles.bookingCard}>
                  <CardContent>
                    <Typography variant='subtitle1'>
                      Date From: {formatDate(booking.dateFrom)}
                    </Typography>
                    <Typography variant='subtitle1'>
                      Date To: {formatDate(booking.dateTo)}
                    </Typography>
                    <Typography variant='subtitle1'>
                      User: {booking.customer && booking.customer.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant='subtitle1'>
                No bookings found for this venue.
              </Typography>
            )}
          </div>
        </CardContent>
        <div className={styles.cardFootContent}>
          <Typography variant='body2'>{price} NOK</Typography>
        </div>
      </Card>
    </div>
  )
}

export default VenueDetails
