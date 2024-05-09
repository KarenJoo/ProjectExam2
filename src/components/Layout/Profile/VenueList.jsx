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
import styles from './VenueList.module.css'

const UserVenuesList = ({ venues, userId }) => {
  return (
    <div>
      <Typography variant='h1' sx={{ margin: '0px auto', textAlign: 'center' }}>
        Your Venues
      </Typography>
      <List sx={{ width: '90%', margin: '0px auto' }}>
        {venues.map((venue) => (
          <React.Fragment key={venue.id}>
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
                  alt={venue.name}
                  src={
                    venue.media && venue.media.length > 0
                      ? venue.media[0].url
                      : ''
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={venue.name}
                secondary={
                  <>
                    {venue.createdBy === userId && (
                      <Link
                        to={`/update/${venue.id}`}
                        className={styles.updateButton}
                      >
                        Update Venue
                      </Link>
                    )}
                    <Link
                      to={`/venue/${venue.id}`}
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

export default UserVenuesList
