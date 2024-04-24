import React from 'react'
import Typography from '@mui/material/Typography'
import useFetch from '../hooks/useFetch'
import { VENUES_URL } from '../utils/api'
import VenueCard from '../components/venueCard'
import styles from '../components/VenueCard.module.css'

const Homepage = () => {
  const { data: venuesData, loading, error } = useFetch(VENUES_URL)

  if (loading) {
    return <div className='contentContainer'>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  console.log('Fetched venues:', venuesData)

  const venues = venuesData.data

  venues.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className={styles.container}>
      <Typography variant='h1'>Holidaze</Typography>
      <Typography variant='h5'>Book and dayze away</Typography>
      <div className='contentContainer'>
        {venues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  )
}

export default Homepage
