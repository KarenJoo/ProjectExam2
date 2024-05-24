import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { SecondaryButton } from '../../Styles/Buttons';

const UserBookingsList = ({ bookings }) => {
  console.log('Bookings:', bookings)


  if (!bookings || bookings.length === 0) {
    return (
      <Typography variant='h5' sx={{ textAlign: 'center', margin: '20px', height: '100px', color: '#fde8c9' }}>
      No bookings
      </Typography>
    );
  }

  return (
    <>
     
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
                  alt={booking.venue?.name || 'No Venue Name'} 
                  src={
                    booking.media && booking.media.length > 0
                      ? booking.media[0].url
                      : ''
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={booking.name ? `${booking.name}` : 'Unknown Venue'}
                secondary={
                  <>
                    <Typography variant='body1'>
                      Check-in: {new Date(booking.dateFrom).toLocaleDateString()}
                    </Typography>
                    <Typography variant='body1'>
                      Check-out: {new Date(booking.dateTo).toLocaleDateString()}
                    </Typography>
                    <Typography variant='body1'>
                      Guests: {booking.guests}
                    </Typography>
                    <Link to={`/booking/${booking.id}`} style={{ textDecoration: 'none' }}>
                      <SecondaryButton variant='outlined'>
                        View Booking
                      </SecondaryButton>
                    </Link>
                  </>
                }
              />
            </ListItem>
            <Divider variant='inset' sx={{ marginBottom: '10px' }} />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default UserBookingsList
