import React from 'react'
import VenueForm from '../../components/forms/VenueForm'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const UpdateVenue = () => {
  const { id } = useParams()

  const handleSubmit = (formData) => {
    console.log('Submitted form data:', formData)
    alert('Venue updated successfully!')
  }

  return (
    <Box sx={{marginTop: '100px'}}>
      <Typography variant='h2'>Update your venue</Typography>
      <VenueForm onSubmit={handleSubmit} isUpdate={true} userId={id} />
    </Box>
  )
}
export default UpdateVenue
