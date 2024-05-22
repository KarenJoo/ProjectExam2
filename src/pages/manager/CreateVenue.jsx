import React from 'react'
import VenueForm from '../../components/forms/VenueForm'
import styles from './VenueForm.module.css'
import { Typography } from '@mui/material'

const CreateVenue = () => {
  const handleSubmit = (formData) => {
    console.log('Submitted form data:', formData)
    alert('Venue created successfully!')
  }
  return (
    <div className={styles.form}>
      <Typography variant='h2'>Create a venue</Typography>

      <VenueForm onSubmit={handleSubmit} isUpdate={false} />
    </div>
  )
}

export default CreateVenue
