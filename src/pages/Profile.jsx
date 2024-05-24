import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserBookingsList from '../components/Layout/Profile/BookingList'
import UserVenuesList from '../components/Layout/Profile/VenueList'
import ProfileLayout from '../components/Layout/ProfileLayout'
import { CREATE_API_KEY, VENUES_URL } from '../utils/api'
import { createApiKey } from '../utils/createApiKey'
import { getUserBookings, getUserVenues } from '../utils/getUserVenues'
import useStorage from '../utils/useStorage'

const Profile = () => {
  const storage = useStorage()
  const [userData, setUserData] = useState(null)
  const [userBookings, setUserBookings] = useState([])
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleDelete = async (venueId) => {
    try {
      const accessToken = storage.loadToken('accessToken')
      const apiKey = await createApiKey(accessToken)

      const url = `${VENUES_URL}/${venueId}`
      const method = 'DELETE'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': apiKey,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete venue')
      }

      console.log('Venue deleted successfully')
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      )
    } catch (error) {
      console.error('Error deleting venue:', error)
      setError(error.message)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = storage.loadUserData()
        const accessToken = storage.loadToken('accessToken')
        console.log('Access Token:', accessToken)

        const getApiKey = await fetch(`${CREATE_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: 'API_KEY' }),
        })

        if (!getApiKey.ok) {
          throw new Error('Failed to fetch API key')
        }

        const apiKeyData = await getApiKey.json()
        const apiKey = apiKeyData.data.key

        const isVenueManager = storedUserData && storedUserData.venueManager

        const userVenuesResponse = await getUserVenues(
          storedUserData.name,
          accessToken,
          apiKey,
          isVenueManager
        )

        if (!userVenuesResponse.ok) {
          throw new Error('Failed to fetch user venues')
        }

        const userVenuesData = await userVenuesResponse.json()

        const userBookingsResponse = await getUserBookings(
          storedUserData.name,
          accessToken,
          apiKey
        )

        if (!userBookingsResponse.ok) {
          throw new Error('Failed to fetch user bookings')
        }

        const userBookingsData = await userBookingsResponse.json()

        setUserBookings(userBookingsData.data)

        const updatedUserData = {
          ...storedUserData,
          venues: userVenuesData.data,
          bookings: userBookingsData.data,
        }

        setUserData(updatedUserData)
        setVenues(userVenuesData.data)
        setUserBookings(userBookingsData.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress
          style={{ color: '#fde8c9' }}
          thickness={6}
          size={80}
        />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        minHeight='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Alert severity='error'>Failed to fetch profile data: {error}</Alert>
      </Box>
    )
  }

  const isVenueManager = userData && userData.venueManager

  return (
    <Grid
      container
      spacing={4}
      sx={{ margin: '10px auto', height: '100vh', width: '100%' }}
    >
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px auto',
            '@media (min-width: 600px)': {
              flexDirection: 'row',
            },
          }}
        >
          {' '}
          <ProfileLayout userData={userData}></ProfileLayout>
          <Box
            sx={{
              flexBasis: '70%',
              '@media (min-width: 600px)': {
                flexBasis: '100%',
                margin: '0 auto',
                paddingRight: '10px',
              },
            }}
          >
            {!isVenueManager && (
              <Box sx={{ margin: '10px auto', width: '90%' }}>
                <UserVenuesList venues={venues} handleDelete={handleDelete} />
              </Box>
            )}
           
              <Box sx={{ margin: '10px auto', width: '90%' }}>
              <Typography variant='h2' sx={{ color: '#fde8c9', margin: '0px auto', textAlign: 'center' }}>
        Your Bookings
      </Typography>
                <UserBookingsList bookings={userBookings} />
              </Box>
         
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Profile
