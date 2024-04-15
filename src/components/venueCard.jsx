import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './VenueCard.module.css';
import { useTheme } from '@mui/material/styles';

const VenueCard = ({ venue }) => {
  const { name, description, media, price, maxGuests, meta, location } = venue;
  const theme = useTheme();

  return (
    <div className={theme.container}>

    <Card className={styles.venueCard} style={{ backgroundColor: '#fff' }}>
      <div className={styles.imageContainer}>
        <img src={media && media.length > 0 ? media[0].url : ''} alt={name} />
      </div>
      <CardContent>
        <Typography variant='h2'>{name}</Typography>
        <Typography variant='body1'>{description}</Typography>
        <Typography variant='body2'>
          Max Guests: {maxGuests} | Location: {location.city}, {location.country}
        </Typography>
        <div className={styles.contentList}>
          <li key='wifi'>WiFi: {meta.wifi ? 'Available' : 'Not Available'}</li>
          <li key='parking'>Parking: {meta.parking ? 'Available' : 'Not Available'}</li>
          <li key='breakfast'>Breakfast: {meta.breakfast ? 'Included' : 'Not Included'}</li>
          <li key='pets'>Pets: {meta.pets ? 'Allowed' : 'Not Allowed'}</li>
        </div>
      </CardContent>
      <div className={styles.cardFootContent}>
        <Typography variant='h4'>{price} NOK</Typography>
        <Link to={`/venue/${venue.id}`} className={styles.viewButton}>
  View Venue
</Link>
      </div>
    </Card>
    </div>
  );
};

export default VenueCard;
