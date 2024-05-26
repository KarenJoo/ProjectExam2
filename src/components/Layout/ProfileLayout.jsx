import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateAvatarUrl } from '../../storage/reducers/avatarReducer'
import { PROFILE_API } from '../../utils/api'
import { createApiKey } from '../../utils/createApiKey'
import useStorage from '../../utils/useStorage'
import UpdateAvatarForm from '../TempForms/AvatarForm'
import VenueForm from '../TempForms/VenueForm'

const ProfileLayout = ({ userData }) => {
  const storage = useStorage()
  const [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = useState(false)
  const { name, bookedVenues, venues, avatar } = userData
  const venuesCount = venues ? venues.length : 0
  const [isVenueManager, setIsVenueManager] = useState(false); 
  const dispatch = useDispatch()
  const reduxAvatarUrl = useSelector((state) => state.avatar.url)

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem('avatarUrl')
    if (storedAvatarUrl) {
      dispatch(updateAvatarUrl(storedAvatarUrl))
    }
  }, [dispatch])

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
    const storedIsVenueManager = localStorage.getItem('isVenueManager');
    setIsVenueManager(storedIsVenueManager === 'true');
  }, []); 
  return (
    <Grid container item md={12}>
      <Box
        sx={{
          margin: '100px auto',
          alignItems: 'center',
          width: '70%',
          '@media (min-width: 600px)': {
            maxWidth: '700px',
            width: '80%',
          },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ margin: '10px auto', width: '80%', textAlign: 'center' }}
        >
          <Grid item xs={12} md={12}>
            {avatar && (
              <Avatar
                alt={name || 'User Avatar'}
                src={reduxAvatarUrl || avatar.url}
                sx={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  width: '250px',
                  height: '200px',
                  minWidth: '200px',
                  minHeight: '200px',
                  boxShadow: '0 2px 4px rgba(0, 0.5, 0.5, 0.5)',
                  margin: '0 auto',
                }}
              />
            )}

            <UpdateAvatarForm
              open={isUpdateAvatarOpen}
              onClose={() => setIsUpdateAvatarOpen(false)}
              onUpdate={handleUpdateAvatar}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: 'auto',
              minWidth: '200px',
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
            <Typography
              variant='h1'
              sx={{
                color: 'primary',
                fontSize: '100%',
                '@media (min-width: 600px)': {
                  fontSize: '100%',
                },
              }}
            >
              {name || 'Unknown User'}
            </Typography>
            <Typography variant='body2'>
              Venue Manager: {isVenueManager ? 'Yes' : 'No'}
            </Typography>
            {isVenueManager && (
              <Typography variant='body2'>
                Total Bookings: {bookedVenues ? bookedVenues.length : 0}
              </Typography>
            )}{' '}
            {isVenueManager && (
              <Grid item xs={12} md={12}>
                <Typography
                  variant='body2'
                  fontWeight={'700'}
                  color={'primary'}
                >
                  Total Venues: {venuesCount}
                </Typography>
                <ul>
                  {bookedVenues &&
                    bookedVenues.map((venue) => (
                      <Box key={venue.id}>
                        <Typography variant='body1'>{venue.name}</Typography>
                        <Typography variant='body2' color='textSecondary'>
                          Location: {venue.location.city},{' '}
                          {venue.location.country}
                        </Typography>
                      </Box>
                    ))}
                </ul>
              </Grid>
            )}{' '}
            <Button
              variant='outlined'
              sx={{ width: '80%', margin: '20px auto' }}
              onClick={() => setIsUpdateAvatarOpen(true)}
            >
              Update Avatar
            </Button>
            {isVenueManager && (
              <Button
                component={Link}
                variant='outlined'
                to={`/create`}
                sx={{
                  color: 'primary',
                  width: '80%',
                  margin: '0px auto',
                  mb: '10px',
                  '&:hover': { color: 'primary' },
                }}
              >
                Create Venue
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <VenueForm isVenueManager={isVenueManager} />
    </Grid>
  )
}

export default ProfileLayout
