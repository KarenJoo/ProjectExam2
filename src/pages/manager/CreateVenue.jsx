import { Box, Typography } from '@mui/material'
import React from 'react'
import VenueForm from '../../components/TempForms/VenueForm'
import useStorage from '../../utils/useStorage'

const CreateVenue = () => {
  const { getUserRole } = useStorage()
  console.log(getUserRole)


  const handleSubmit = (formData) => {
    console.log('Submitted form data:', formData)
  }

  return (
    <Box
      sx={{
        maxWidth: '500px',
        minWidth: '100px',
        height: '100vh',
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

      
        <VenueForm onSubmit={handleSubmit} isUpdate={false} />
   
     
    </Box>
  )
}

export default CreateVenue
