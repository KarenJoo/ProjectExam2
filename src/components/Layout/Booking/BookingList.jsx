import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import styles from '../../Layout/Profile/VenueList.module.css'
import dayjs from 'dayjs'

const BookingList = ({ bookings }) => {
    const formatDate = (dateString) => {
        return dayjs(dateString).format('YYYY-MM-DD');
      };
    
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
                  backgroundColor: '#fff',
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
                primary={
                  <Typography variant='h6' noWrap>
                    {booking.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant='h5'
                      color={'#000'}
                      margin={'10px 0px 10px 0px'}
                    >
                      {booking.description}
                    </Typography>
                    <ListItem>
                      <ListItemText>
                        <Typography variant='body2'>
                          Date From: {formatDate(booking.dateFrom)}
                        </Typography>
                        <Typography variant='body2'>
                          Date To: {formatDate(booking.dateTo)}
                        </Typography>
                      </ListItemText>
                    </ListItem>
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
            <Divider
              variant='inset'
              sx={{ marginBottom: '10px' }}
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default BookingList
