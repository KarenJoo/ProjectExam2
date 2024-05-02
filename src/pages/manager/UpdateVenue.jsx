import React from 'react'
import VenueForm from '../../components/Forms/VenueForm'
import styles from './VenueForm.module.css'
import { Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'

const UpdateVenue = () => {
  const { accessToken } = useAuth()
  const { id } = useParams()

  const handleSubmit = (formData) => {
    console.log('Submitted form data:', formData)
    alert('Venue updated successfully!')
  }

  return (
    <div className={styles.form}>
      <Typography variant='h2'>Update your venue</Typography>
      <VenueForm onSubmit={handleSubmit} isUpdate={true} userId={id} />
      <div></div>
    </div>
  )
}
export default UpdateVenue
