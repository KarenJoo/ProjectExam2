import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { SecondaryButton } from '../../Styles/Buttons'

const UserBookingsList = ({ bookings }) => {
  console.log('Bookings:', bookings)

  if (!bookings || bookings.length === 0) {
    return (
      <Typography
        variant='h5'
        sx={{
          textAlign: 'center',
          margin: '20px',
          height: '100px',
          color: '#fde8c9',
        }}
      >
        No bookings
      </Typography>
    )
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
                  backgroundColor: '#fffffcf',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ height: '80px', width: '80px', marginRight: '10px' }}
                  alt={booking.venue?.name || 'No Venue Name'}
                  src={
                    booking.venue.media && booking.venue.media.length > 0
                      ? booking.venue.media[0].url
                      : ''
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  booking.venue.name ? `${booking.venue.name}` : 'Unknown Venue'
                }
                secondary={
                  <>
                    <Typography
                      variant='body1'
                      sx={{
                        fontSize: '12px',
                        color: '#000',
                        mb: '10px',
                        mt: '10px',
                      }}
                    >
                      From: {new Date(booking.dateFrom).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        fontSize: '12px',
                        color: '#000',
                        mb: '10px',
                        mt: '10px',
                      }}
                    >
                      To: {new Date(booking.dateTo).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        fontSize: '12px',
                        color: '#000',
                        mb: '10px',
                        mt: '10px',
                      }}
                    >
                      Guests: {booking.guests}
                    </Typography>
                    <Link
                      to={`/booking/${booking.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <SecondaryButton
                        variant='outlined'
                        component={Link}
                        to={`/venue/${booking.venue.id}`}
                        sx={{
                          textDecoration: 'none',
                          color: '#000',
                          borderColor: '#000',
                          margin: '10px auto',
                          '&:hover': { color: 'primary' },
                          mr: 1,
                        }}
                      >
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
  )
}

export default UserBookingsList
