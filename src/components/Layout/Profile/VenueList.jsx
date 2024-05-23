import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Box,
  Link as MuiLink,
} from '@mui/material'
import { Link } from 'react-router-dom'

const VenuesList = ({ venues, userId, handleDelete }) => {
  const handleVenueDelete = (venueId) => {
    handleDelete(venueId)
  }
  return (
    <>
      <Typography
        variant='h2'
        sx={{ color: '#fde8c9', margin: '20px auto', textAlign: 'center' }}
      >
        Your Venues
      </Typography>
      <List sx={{ width: '100%', margin: '0px auto' }}>
        {venues.map((venue) => (
          <React.Fragment key={venue.id}>
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
                mb: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ height: '80px', width: '80px', marginRight: '10px' }}
                  alt={venue.name}
                  src={
                    venue.media && venue.media.length > 0
                      ? venue.media[0].url
                      : ''
                  }
                />
              </ListItemAvatar>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
              >
                <ListItemText
                  primary={venue.name}
                  sx={{ mb: '10px' }}
                  secondary={
                    <>
                      {venue.createdBy === userId && (
                        <>
                          <Box sx={{ display: 'flex' }}>
                            <Button
                              component={Link}
                              to={`/update/${venue.id}`}
                              sx={{
                                color: '#000',
                                fontSize: '12px',
                                '&:hover': { color: '#01333e' },
                                mr: 1,
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              onClick={() => handleVenueDelete(venue.id)}
                              color='error'
                              sx={{ fontSize: '12px' }}
                            >
                              Delete
                            </Button>
                          </Box>{' '}
                          <Button
                            variant='outlined'
                            component={Link}
                            to={`/venue/${venue.id}`}
                            sx={{
                              textDecoration: 'none',
                              color: '#000',
                              borderColor: '#000',
                              margin: '10px auto',
                              '&:hover': { color: '#01333e' },
                              mr: 1,
                            }}
                          >
                            View Venue
                          </Button>
                        </>
                      )}
                    </>
                  }
                />
              </Box>
            </ListItem>
            <Divider variant='inset' sx={{ marginBottom: '10px' }} />
          </React.Fragment>
        ))}
      </List>
    </>
  )
}

export default VenuesList
