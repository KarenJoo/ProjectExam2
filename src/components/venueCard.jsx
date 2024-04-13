import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'
import styles from './VenueCard.module.css'

const VenueCard = ({ venue }) => {
  const { _id, name, description, media, price, maxGuests, meta, location } =
    venue

  return (
    <Card className={styles.venueCard}>
      <div className={styles.imageContainer}>
        <img src={media && media.length > 0 ? media[0].url : ''} alt={name} />
      </div>
      <CardContent>
        <Typography variant='h2'>{name}</Typography>
        <Typography variant='body1'>{description}</Typography>
        <Typography variant='body2'>
          Max Guests: {maxGuests} | Location: {location.city},{' '}
          {location.country}
        </Typography>
        <ul>
          <li>WiFi: {meta.wifi ? 'Available' : 'Not Available'}</li>
          <li>Parking: {meta.parking ? 'Available' : 'Not Available'}</li>
          <li>Breakfast: {meta.breakfast ? 'Included' : 'Not Included'}</li>
          <li>Pets: {meta.pets ? 'Allowed' : 'Not Allowed'}</li>
        </ul>
      </CardContent>
      <div className={styles.cardFootContent}>
        <Typography variant='h4'>{price} NOK</Typography>
        <Link to={`/venue/${_id}`} className={styles.viewButton}>
          View Venue
        </Link>
      </div>
    </Card>
  )
}

export default VenueCard
