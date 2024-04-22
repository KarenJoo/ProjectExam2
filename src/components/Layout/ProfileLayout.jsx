import React from 'react'
import { Avatar, Typography, Grid } from '@mui/material'

const ProfileLayout = ({ userData }) => {
  const { name, avatar, bookedVenues, venueManager } = userData

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        {avatar && (
          <Avatar
            alt={name || 'User Avatar'}
            src={avatar.url}
            sx={{ width: 120, height: 120 }}
          />
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography variant='h1'>{name || 'Unknown User'}</Typography>
        <Typography variant='body1'>Username: {name || 'Unknown'}</Typography>
        <Typography variant='body1'>
          Venue Manager: {venueManager ? 'Yes' : 'No'}
        </Typography>
        <Typography variant='h2' gutterBottom>
          Booked Venues Overview
        </Typography>
        <ul>
          {bookedVenues &&
            bookedVenues.map((venue) => (
              <li key={venue.id}>
                <Typography variant='body1'>{venue.name}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  Location: {venue.location}
                </Typography>
              </li>
            ))}
        </ul>
      </Grid>
    </Grid>
  )
}

export default ProfileLayout
