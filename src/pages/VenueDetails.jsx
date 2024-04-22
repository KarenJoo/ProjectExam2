import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { VENUES_URL } from '../utils/api'
import { Card, CardContent, Typography } from '@mui/material'
import styles from '../components/VenueCard.module.css'

const VenueDetails = () => {
  const { id } = useParams()
  const API_URL = `${VENUES_URL}/${id}`

  const { data: venueData, loading, error } = useFetch(API_URL)
  const [venueDetails, setVenueDetails] = useState(null)

  useEffect(() => {
    if (venueData && venueData.data) {
      setVenueDetails(venueData.data)
    }
  }, [venueData])

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

  return (
    <div className={styles.container}>
      <Card className={styles.venueCard} style={{ marginBottom: '100px' }}>
        {' '}
        <div className={styles.imageContainer}>
          <img src={media && media.length > 0 ? media[0].url : ''} alt={name} />
        </div>
        <CardContent>
          <Typography variant='h2'>{name}</Typography>
          <Typography variant='body1'>{description}</Typography>
          <Typography variant='body2'>
            Address: {location.address}, {location.city}, {location.country} |
            Max Guests: {maxGuests}
          </Typography>
          <Typography variant='body2'>Rating: {rating}</Typography>
          <Typography variant='body2'>
            Owner: {owner && owner.name ? owner.name : 'Unknown Owner'}
          </Typography>
          <div className={styles.contentList}>
            <li key='wifi'>
              WiFi: {meta.wifi ? 'Available' : 'Not Available'}
            </li>
            <li key='parking'>
              Parking: {meta.parking ? 'Available' : 'Not Available'}
            </li>
            <li key='breakfast'>
              Breakfast: {meta.breakfast ? 'Included' : 'Not Included'}
            </li>
            <li key='pets'>Pets: {meta.pets ? 'Allowed' : 'Not Allowed'}</li>
          </div>
          <Typography variant='h3'>Bookers:</Typography>
          <ul>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <li key={booking.id}>{booking.customer.name}</li>
              ))
            ) : (
              <li>No bookings found for this venue.</li>
            )}
          </ul>
        </CardContent>
        <div className={styles.cardFootContent}>
          <Typography variant='h4'>{price} NOK</Typography>
        </div>
      </Card>
    </div>
  )
}

export default VenueDetails
