import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './VenueList.module.css'

const UserBookingsList = ({ bookings }) => {
  console.log('Bookings:', bookings)
  return (
    <>
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
                primary={booking.name ? `${booking.name}` : 'Unknown Booking'}
                secondary={
                  <>
                    <Typography variant='subtitle1'>
                      Check-in: {booking.dateFrom}
                    </Typography>
                    <Typography variant='subtitle1'>
                      Check-out: {booking.dateTo}
                    </Typography>
                    <Typography variant='subtitle1'>
                      Guests: {booking.guests}
                    </Typography>
                    <Link
                      to={`/venue/${booking.id}`}
                      className={styles.viewButton}
                    >
                      View Booking
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
