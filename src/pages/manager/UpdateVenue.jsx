import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import VenueForm from '../../components/forms/VenueForm'

const UpdateVenue = () => {
  const { id } = useParams()

  const handleSubmit = (formData) => {
    console.log('Submitted form data:', formData)
  }

  return (
    <Box
      sx={{
        maxWidth: '500px',
        minWidth: '100px',
        height: '900px',
        width: '80%',
        padding: '20px',
        backgroundColor: '#f5f5f5df',
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '100px auto',
        marginBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h2'>Update your venue</Typography>
      <VenueForm onSubmit={handleSubmit} isUpdate={true} userId={id} />
    </Box>
  )
}
export default UpdateVenue
