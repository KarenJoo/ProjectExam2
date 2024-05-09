import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './VenueCard.module.css';

const VenueCard = ({ venue }) => {
  const { name, description, media, price, maxGuests, meta, location } = venue;

  const wifiStatus = meta?.wifi ? 'Available' : 'Not Available';
  const parkingStatus = meta?.parking ? 'Available' : 'Not Available';
  const breakfastStatus = meta?.breakfast ? 'Included' : 'Not Included';
  const petsStatus = meta?.pets ? 'Allowed' : 'Not Allowed';

  return (
    <Card className={styles.venueCard} style={{ backgroundColor: '#fff' }}>
      <div className={styles.imageContainer}>
        <img src={media && media.length > 0 ? media[0].url : ''} alt={name} />
      </div>
      <CardContent>
        <Typography variant='h2'>{name}</Typography>
        <Typography variant='body1'>{description}</Typography>
        <Typography variant='body2'>
          Max Guests: {maxGuests} | Location: {location && location.city},{' '}
          {location && location.country}
        </Typography>
        <div className={styles.contentList}>
          <Typography key='wifi'>WiFi: {wifiStatus}</Typography>
          <Typography key='parking'>Parking: {parkingStatus}</Typography>
          <Typography key='breakfast'>Breakfast: {breakfastStatus}</Typography>
          <Typography key='pets'>Pets: {petsStatus}</Typography>
        </div>
      </CardContent>
      <div className={styles.cardFootContent}>
        <Typography variant='body2'>{price} NOK</Typography>
        <Link to={`/venue/${venue.id}`} className={styles.viewButton}>
          View Venue
        </Link>
      </div>
    </Card>
  );
};

export default VenueCard;
