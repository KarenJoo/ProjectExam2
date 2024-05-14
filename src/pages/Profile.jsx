import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import useStorage from '../utils/useStorage'
import { getUserVenues, getUserBookings } from '../utils/getUserVenues'
import { CREATE_API_KEY } from '../utils/api'
import UserVenuesList from '../components/Layout/Profile/VenueList'
import UserBookingsList from '../components/Layout/Profile/BookingList'
import { createApiKey } from '../utils/createApiKey'
import { VENUES_URL } from '../utils/api'

const Profile = () => {
  const storage = useStorage()
  const [userData, setUserData] = useState(null)
  const [userBookings, setUserBookings] = useState([])
  const [venues, setVenues] = useState([])

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
        }

        setUserData(updatedUserData)
        setVenues(userVenuesData.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  const isVenueManager = userData && userData.venueManager

  return (
    <div className='contentContainer'>
      <ProfileLayout userData={userData} />
      {isVenueManager && (
        <UserVenuesList venues={venues} handleDelete={handleDelete} />
      )}
      {!isVenueManager && <UserBookingsList bookings={userBookings} />}
    </div>
  )
}

export default Profile
