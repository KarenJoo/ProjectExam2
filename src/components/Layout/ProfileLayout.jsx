import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAvatarUrl } from '../../storage/reducers/avatarReducer'
import { PROFILE_API } from '../../utils/api'
import { createApiKey } from '../../utils/createApiKey'
import useStorage from '../../utils/useStorage'
import UpdateAvatarForm from '../forms/AvatarForm'

const ProfileLayout = ({ userData }) => {
  const storage = useStorage()
  const [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = useState(false)
  const { name, bookedVenues, venues, avatar } = userData
  const venuesCount = venues ? venues.length : 0
  const [isVenueManager, setIsVenueManager] = useState(userData.venueManager)
  const dispatch = useDispatch()
  const reduxAvatarUrl = useSelector((state) => state.avatar.url)

  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      const accessToken = storage.loadToken('accessToken')
      const apiKey = await createApiKey(accessToken)

      const url = `${PROFILE_API}/${name}`
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

      localStorage.setItem('avatarUrl', avatarUrl)
      dispatch(updateAvatarUrl(avatarUrl))
      setIsUpdateAvatarOpen(false)
    } catch (error) {
      console.error('Error updating avatar:', error)
    }
  }
  useEffect(() => {
    setIsVenueManager(userData.isVenueManager)
  }, [userData.isVenueManager])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '100px auto',
        '@media (min-width: 600px)': {
          flexDirection: 'column',
          maxWidth: '700px',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {avatar && (
            <Avatar
              alt={name || 'User Avatar'}
              src={reduxAvatarUrl || avatar.url}
              sx={{
                width: 120,
                height: 120,
                boxShadow: '0 2px 4px rgba(0, 0.5, 0.5, 0.5)',
              }}
            />
          )}
          <Button
            variant='contained'
            onClick={() => setIsUpdateAvatarOpen(true)}
          >
            Update Avatar
          </Button>
          <UpdateAvatarForm
            open={isUpdateAvatarOpen}
            onClose={() => setIsUpdateAvatarOpen(false)}
            onUpdate={handleUpdateAvatar}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            height: 'auto',
            margin: '10px auto',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: '#ffffffcf',
            border: '0.5px solid #fde8c9',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Typography variant='h1' sx={{ color: '#01333e' }}>
            {name || 'Unknown User'}
          </Typography>
          <Typography variant='h5'>
            Venue Manager: {isVenueManager ? 'Yes' : 'No'}
          </Typography>
          {!isVenueManager && (
            <Typography variant='h5'>
              Total Bookings: {bookedVenues ? bookedVenues.length : 0}
            </Typography>
          )}{' '}
        </Grid>
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
    </Box>
  )
}

export default ProfileLayout
