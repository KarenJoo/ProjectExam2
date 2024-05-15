import React, { useState} from 'react'
import { Avatar, Typography, Grid, Button } from '@mui/material'
import UpdateAvatarForm from '../Forms/AvatarForm'
import styles from './ProfileLayout.module.css'
import { PROFILE_API } from '../../utils/api'
import { createApiKey } from '../../utils/createApiKey'
import useStorage from '../../utils/useStorage'

const ProfileLayout = ({ userData }) => {
  const storage = useStorage()
  const [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = useState(false);
  const { name, avatar, bookedVenues, venueManager, venues } = userData
  const venuesCount = venues ? venues.length : 0
  const isVenueManager = userData && userData.venueManager

  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      const accessToken = storage.loadToken('accessToken')
      const apiKey = await createApiKey(accessToken)

   const url = `${PROFILE_API}/${name}`;
    const method = 'PUT'
    const response = await fetch(url, {
      method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify({ avatar: { url: avatarUrl } }),
    })
    if (!response.ok) {
      throw new Error('Failed to update avatar')
    }
   
  } catch (error) {
    console.error('Error updating avatar:', error)
  }
  };

  return (
    <div className={styles.profileContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {avatar && (
            <Avatar
              alt={name || 'User Avatar'}
              src={avatar.url}
              sx={{ width: 120, height: 120 }}
            />
          )}
           <Button onClick={() => setIsUpdateAvatarOpen(true)} variant='outlined' color='secondary'>Update Avatar</Button>
          <UpdateAvatarForm
            open={isUpdateAvatarOpen}
            onClose={() => setIsUpdateAvatarOpen(false)}
            onUpdate={handleUpdateAvatar}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant='h2'>{name || 'Unknown User'}</Typography>
          <Typography variant='body1'>
            Venue Manager: {venueManager ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        {!isVenueManager && (
          <Typography variant='body1'>
            Total Bookings: {bookedVenues ? bookedVenues.length : 0}
          </Typography>
        )}
      </Grid>

      {isVenueManager && (
        <Grid item xs={12} md={9}>
          <Typography variant='body1'>Total Venues: {venuesCount}</Typography>
          <ul>
            {bookedVenues &&
              bookedVenues.map((venue) => (
                <div key={venue.id}>
                  <Typography variant='body1'>{venue.name}</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Location: {venue.location.city}, {venue.location.country}
                  </Typography>
                </div>
              ))}
          </ul>
        </Grid>
      )}
    </div>
  )
}

export default ProfileLayout
