import React, { useEffect, useState } from 'react'
import ProfileLayout from '../components/Layout/ProfileLayout'
import useStorage from '../utils/useStorage'
import { getUserVenues, getUserBookings } from '../utils/getUserVenues'
import { CREATE_API_KEY } from '../utils/api'
import UserVenuesList from '../components/Layout/Profile/VenueList'
import UserBookingsList from '../components/Layout/Profile/BookingList'

const Profile = () => {
  const storage = useStorage()
  const [userData, setUserData] = useState(null)
  const [userBookings, setUserBookings] = useState([])

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

        const isVenueManager = userData && userData.venueManager

        const userVenuesResponse = await getUserVenues(
          storedUserData.name,
          accessToken,
          apiKey,
          !isVenueManager
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
    <div>
      <div className='contentContainer'>
        <ProfileLayout userData={userData} />
        {isVenueManager && (
          <div>
            <UserVenuesList venues={userData.venues} />
          </div>
        )}

        <div>
          <UserBookingsList bookings={userBookings} />
        </div>
      </div>
    </div>
  )
}

export default Profile
