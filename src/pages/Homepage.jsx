import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import VenueCard from '../components/venueCard'
import styles from '../components/VenueCard.module.css'
import { API_BASE_URL } from '../utils/api'
import { Box, TextField } from '@mui/material';
import useFetch from '../hooks/useFetch'
import { filterVenues } from '../components/SearchAndFilter'

const Homepage = () => {
  const API_URL = `${API_BASE_URL}/venues`
  const { data: venues, loading, error } = useFetch(API_URL)
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return <div className='contentContainer'>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }
  const sortedVenues = venues.sort((a, b) => {
    const dateA = new Date(a.created).getTime()
    const dateB = new Date(b.created).getTime()
    return dateB - dateA
  })

  const filteredVenues = filterVenues(venues, searchTerm);

  
  return (
    <div className={styles.container}>
      <Typography variant='h1'>Holidaze</Typography>
      <Typography variant='h2'>Book and dayze away</Typography>
      {/* Styled Search Bar */}
      <Box className={styles.searchBar} bgcolor='#fff' border={'1px'} borderColor={'#000'} borderRadius={2} boxShadow={1} margin={'0px auto'} width={'74%'}>
        <TextField
          className={styles.searchInput}
          fullWidth
          variant='outlined'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search venues...'
          InputLabelProps={{
            style: { color: '#1976d2' }, // Primary color text
          }}
         
        />
      </Box>
      <div className={styles.cardContainer}>
        {/* Display filtered venues */}
        {filteredVenues.map((venue) => (
          <div className={styles.card} key={venue.id}>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
      {/* Display all venues */}
      <div className={styles.cardContainer}>
        {sortedVenues.map((venue) => (
          <div className={styles.card} key={venue.id}>
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Homepage
