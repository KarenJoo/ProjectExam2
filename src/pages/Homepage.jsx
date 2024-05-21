import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import VenueCard from '../components/venueCard'
import { API_BASE_URL } from '../utils/api'
import { Box, TextField, Grid, Alert } from '@mui/material'
import useFetch from '../hooks/useFetch'
import { filterVenues } from '../components/SearchAndFilter'
import ViewMoreButton from '../components/Styles/Buttons'

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

  const filteredVenues = filterVenues(sortedVenues, searchTerm)

  return (
    <Box p={2} textAlign='center'>
      <Box>
        <Typography variant='h1'>Holidaze</Typography>
        <Typography variant='h3' color='primary'>
          Book and dayze away
        </Typography>

        {/* Styled Search Bar */}
        <Box
          bgcolor='#fff'
          borderRadius={2}
          boxShadow={1}
          margin={'20px auto'}
          width={{ xs: '100%', sm: '80%', md: '60%' }}
        >
          <TextField
            fullWidth
            variant='outlined'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search venues...'
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '40px',
                fontSize: '12px',
                '& .MuiInputBase-input': {
                  padding: '5px 10px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#000',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: '3px solid #fde8c9',
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: '12px',
              },
              '& .MuiInputLabel-shrink': {
                fontSize: '12px',
              },
            }}
          />
        </Box>

        {/* Display filtered and sorted venues up to the display count */}
        <Box minHeight='100vh'>
          <Grid container spacing={1} justifyContent='center'>
            {filteredVenues.length > 0 ? (
              filteredVenues.slice(0, displayCount).map((venue) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={venue.id}
                  display='flex'
                  justifyContent='center'
                >
                  <VenueCard venue={venue} />
                </Grid>
              ))
            ) : (
              <Alert severity='warning' sx={{ mt: 2 }}>
                No venues found.
              </Alert>
            )}
          </Grid>
        </Box>
      </Box>

      {/* Button to load more venues */}
      <Box mt={2} mb={2}>
        {displayCount < filteredVenues.length && (
          <ViewMoreButton onClick={handleViewMore} />
        )}
      </Box>
    </Box>
  )
}

export default Homepage
