import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../../Layout/Profile/VenueList.module.css';

const BookingList = ({ bookings }) => {
    return (
      <div>
        <Typography variant='h1' sx={{ margin: '0px auto', textAlign: 'center' }}>
          Bookings
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
                <ListItemAvatar>
                  <Avatar
                    sx={{ height: '80px', width: '80px', marginRight: '10px' }}
                    alt={booking.name}
                    src={
                      booking.media && booking.media.length > 0
                        ? booking.media[0].url
                        : ''
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={booking.name}
                  secondary={
                    <>
                      <Typography variant='subtitle1'>
                        Description: {booking.description}
                      </Typography>
                      <Typography variant='subtitle1'>
                        Date From: {booking.dateFrom}
                      </Typography>
                      <Typography variant='subtitle1'>
                        Date To: {booking.dateTo}
                      </Typography>
                      <Link
                        to={`/venue/${booking.id}`}
                        className={styles.viewButton}
                      >
                        View Venue
                      </Link>
                    </>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' sx={{ marginBottom: '10px' }} />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  };
  

export default BookingList;
