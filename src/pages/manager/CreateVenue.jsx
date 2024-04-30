import React from 'react'
import CreateVenueForm from '../../components/Forms/CreateVenueForm'
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

      <CreateVenueForm onSubmit={handleSubmit} />

      <div></div>
    </div>
  )
}

export default CreateVenue
