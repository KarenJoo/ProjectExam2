import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './VenueList.module.css';

const BookingList = ({ bookings, userId }) => {
    console.log('Bookings:', bookings);
  return (
    <div>
      <Typography variant='h1' sx={{ margin: '0px auto', textAlign: 'center' }}>
        Your Bookings
      </Typography>
      <List sx={{ width: '90%', margin: '0px auto' }}>
        {bookings.map((booking) => (
          <React.Fragment key={booking.id}>
            <ListItem
              alignItems='flex-start'
              sx={{
                borderRadius: '8px',
                border: '0.5px solid #fff',
                backgroundColor: '#ffffffcf',
                '&:hover': {
                  backgroundColor: '#fde8c9',
                },
              }}
            >
              <ListItemText
                primary={`Booking ID: ${booking.id}`}
                secondary={
                  <>
                    <Typography variant="subtitle1">
                      Check-in: {booking.dateFrom}
                    </Typography>
                    <Typography variant="subtitle1">
                      Check-out: {booking.dateTo}
                    </Typography>
                    <Typography variant="subtitle1">
                      Guests: {booking.guests}
                    </Typography>
                    <Link
                      to={`/booking/${booking.id}`}
                      className={styles.viewButton}
                    >
                      View Booking
                    </Link>
                  </>
                }
              />
            </ListItem>
            <Divider
              variant='inset'
              sx={{ marginBottom: '10px' }}
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default BookingList;
