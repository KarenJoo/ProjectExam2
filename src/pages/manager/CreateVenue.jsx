import { Box, Typography } from '@mui/material'
import React from 'react'
import { AlertError } from '../../components/Styles/Errors'
import VenueForm from '../../components/forms/VenueForm'
import useStorage from '../../utils/useStorage'

const CreateVenue = () => {
  const { getUserRole } = useStorage()
  const userRole = getUserRole()

  const handleSubmit = (formData) => {
    console.log('Submitted form data:', formData)
    alert('Venue created successfully!')
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
      <Typography variant='h2'>Create a venue</Typography>

      {userRole === 'venue_manager' ? (
        <VenueForm onSubmit={handleSubmit} isUpdate={false} />
      ) : (
        <AlertError message='Only venue managers can create or update venues.' />
      )}
    </Box>
  )
}

export default CreateVenue
