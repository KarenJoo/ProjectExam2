import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import VenueCard from '../components/venueCard'
import { API_BASE_URL } from '../utils/api'
import { Box, TextField, Grid, Button } from '@mui/material'
import useFetch from '../hooks/useFetch'
import { filterVenues } from '../components/SearchAndFilter'

const Homepage = () => {
  const API_URL = `${API_BASE_URL}/venues`
  const { data: venues, loading, error } = useFetch(API_URL)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayCount, setDisplayCount] = useState(6)

  if (loading) {
    return <div className='contentContainer'>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 6)
  }

  const sortedVenues = venues.sort((a, b) => {
    const dateA = new Date(a.created).getTime()
    const dateB = new Date(b.created).getTime()
    return dateB - dateA
  })

  const filteredVenues = filterVenues(venues, searchTerm)

  return (
    <Box p={2} textAlign='center'>
      <Typography variant='h1'>Holidaze</Typography>
      <Typography variant='h3' color='primary'>
        Book and dayze away
      </Typography>

      {/* Styled Search Bar */}
      <Box
        bgcolor='#fff'
        border={'1px'}
        borderColor={'#000'}
        borderRadius={2}
        boxShadow={1}
        margin={'20px auto'}
        width={'74%'}
      >
        <TextField
          fullWidth
          variant='outlined'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search venues...'
          InputLabelProps={{
            style: { color: '#1976d2' },
          }}
        />
      </Box>

      <Grid container spacing={0} justifyContent='center'>
        {/* Display filtered venues */}
        {filteredVenues.map((venue) => (
          <Grid item xs={12} sm={4} md={3} key={venue.id}>
            <VenueCard venue={venue} />
          </Grid>
        ))}
      </Grid>

      {/* Display venues up to the display count */}
      <Grid container spacing={2} justifyContent='center'>
        {sortedVenues.slice(0, displayCount).map((venue) => (
          <Grid item xs={12} sm={6} md={4} key={venue.id}>
            <VenueCard venue={venue} />
          </Grid>
        ))}
      </Grid>

      {/* Button to load more venues */}
      {displayCount < sortedVenues.length && (
        <Button onClick={handleViewMore} variant='contained' color='primary'>
          View More
        </Button>
      )}
    </Box>
  );
};

export default Homepage
