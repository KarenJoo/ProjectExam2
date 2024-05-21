import React, { useState } from 'react'
import HeroSlider from '../components/Layout/HeroSlider'
import Typography from '@mui/material/Typography'
import VenueCard from '../components/venueCard'
import { API_BASE_URL } from '../utils/api'
import { Box, TextField, Grid, CircularProgress } from '@mui/material'
import useFetch from '../hooks/useFetch'
import { filterVenues } from '../components/SearchAndFilter'
import ViewMoreButton from '../components/Styles/Buttons'
import { AlertError, AlertWarning } from '../components/Styles/Errors'

const Homepage = () => {
  const API_URL = `${API_BASE_URL}/venues`
  const { data: venues, loading, error } = useFetch(API_URL)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayCount, setDisplayCount] = useState(6)

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
      <Box minHeight='100vh'>
        <AlertError message={`Failed to fetch venues`} />
      </Box>
    )
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
    <Box textAlign='center'>
      <HeroSlider />

      <Box>
        <Typography variant='h1' color='primary' marginTop='10px'>
          Book and dayze away
        </Typography>

        {/* Styled Search Bar */}
        <Box
          bgcolor='#fff'
          borderRadius={2}
          boxShadow={1}
          margin={'10px auto'}
          width={{ xs: '85%', sm: '60%', md: '60%' }}
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
        <Box minHeight='100vh' width='95%' margin='20px auto'>
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
              <Box minHeight='100vh'>
                <AlertWarning message={`No venues found`} />
              </Box>
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
