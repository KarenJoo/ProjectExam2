import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'

const BookingList = ({ bookings }) => {
  const formatDate = (dateString) => {
    return dayjs(dateString).format('YYYY-MM-DD')
  }

  return (
    <Box
      sx={{
        '@media (min-width: 600px)': {
          mt: '120px',
        },
      }}
    >
      <Typography
        variant='h2'
        sx={{ color: '#fde8c9', margin: '0px auto', textAlign: 'center' }}
      >
        Bookings
      </Typography>
      <List sx={{ width: '100%', margin: '0px auto' }}>
        {bookings.map((booking) => (
          <React.Fragment key={booking.id}>
            <ListItem
              alignItems='flex-start'
              sx={{
                borderRadius: '8px',
                border: '0.5px solid #fff',
                backgroundColor: '#ffffffcf',
                '&:hover': {
                  transition: 'transform 0.1s ease-in-out',
                  '&:hover': { transform: 'scale(1.04)' },
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ height: '80px', width: '80px', marginRight: '10px' }}
                  alt={booking.venueName}
                  src={
                    booking.media && booking.media.length > 0
                      ? booking.media[0].url
                      : ''
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='body1' noWrap>
                    {booking.venueName}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant='body3'
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
                    <Link to={`/venue/${booking.id}`}>View Venue</Link>
                  </>
                }
              />
            </ListItem>
            <Divider variant='inset' sx={{ marginBottom: '10px' }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default BookingList
