import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import VenueCard from '../components/venueCard'
import styles from '../components/VenueCard.module.css'
import { API_BASE_URL } from '../utils/api'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/venues`)
        if (!response.ok) {
          throw new Error('Failed to fetch venues')
        }
        const data = await response.json()
        const sortedVenues = data.data.sort((a, b) => {
          return new Date(b.created) - new Date(a.created)
        })
        setVenues(sortedVenues)
        setLoading(false)
      } catch (error) {
        setError('Failed to get venues. Please try again later.')
        setLoading(false)
      }
    }

    fetchVenues()

    return () => {}
  }, [])

  if (loading) {
    return <div className='contentContainer'>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={styles.container}>
      <Typography variant='h1'>Holidaze</Typography>
      <Typography variant='h2'>Book and dayze away</Typography>
      <Link to={`/booking`}>
        Book here
      </Link>
      <div className={styles.cardContainer}>
        {venues.map((venue) => (
          <div className={styles.card} key={venue.id}>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Homepage
