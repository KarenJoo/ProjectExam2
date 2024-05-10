import React from 'react'
import Typography from '@mui/material/Typography'
import VenueCard from '../components/venueCard'
import styles from '../components/VenueCard.module.css'
import { API_BASE_URL } from '../utils/api'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const API_URL = `${API_BASE_URL}/venues`
  const { data: venues, loading, error } = useFetch(API_URL)

  if (loading) {
    return <div className='contentContainer'>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }
  const sortedVenues = venues.sort((a, b) => {
    return new Date(b.created) - new Date(a.created)
  })
  return (
    <div className={styles.container}>
      <Typography variant='h1'>Holidaze</Typography>
      <Typography variant='h2'>Book and dayze away</Typography>
      <Link to={`/booking`}>Book here</Link>
      <div className={styles.cardContainer}>
        {sortedVenues.map((venue) => (
          <div className={styles.card} key={venue.id}>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Homepage
