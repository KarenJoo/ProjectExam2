import React, { useState } from 'react'
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
} from '@mui/material'
import { VENUES_URL } from '../../utils/api'
import useStorage from '../../utils/useStorage'
import styles from '../../pages/manager/VenueForm.module.css'
import CheckAuth from '../../utils/CheckAuth'
import useAuth from '../../hooks/useAuth'
import { createApiKey } from '../../utils/createApiKey'

const CreateVenueForm = ({ onSubmit }) => {
  const storage = useStorage()
  const { isVenueManager } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: '',
      city: '',
      country: '',
    },
    imageUrl: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const accessToken = storage.loadToken('accessToken')
      console.log('Access Token:', accessToken)

      if (!accessToken) {
        throw new Error('Access token not found')
      }

      if (!isVenueManager) {
        throw new Error('Only venue managers can create venues')
      }

      const apiKey = await createApiKey(accessToken, storage.saveApiKey)
      console.log('API Key:', apiKey)

      const response = await fetch(VENUES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create venue')
      }

      console.log('Venue created successfully:', data)
      alert('Venue created successfully!')

      if (onSubmit) {
        onSubmit(data)
      }
    } catch (error) {
      console.error('Failed to create venue:', error)
      alert('Failed to create venue')
    }
  }

  return (
    <>
      <CheckAuth />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Venue Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='address'
              name='address'
              value={formData.location.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='City'
              name='city'
              value={formData.location.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Country'
              name='country'
              value={formData.location.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Price'
              name='price'
              type='number'
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label='Max Guests'
              name='maxGuests'
              type='number'
              value={formData.maxGuests}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* venue checkbox */}
          <div className={styles.valueForm}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.meta.wifi}
                    onChange={handleChange}
                    name='wifi'
                    color='primary'
                  />
                }
                label='WiFi'
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.meta.parking}
                    onChange={handleChange}
                    name='parking'
                    color='primary'
                  />
                }
                label='Parking'
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.meta.breakfast}
                    onChange={handleChange}
                    name='breakfast'
                    color='primary'
                  />
                }
                label='Breakfast'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.meta.pets}
                    onChange={handleChange}
                    name='pets'
                    color='primary'
                  />
                }
                label='Pets'
              />
            </Grid>
          </div>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Image URL'
              name='imageUrl'
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='outlined' color='secondary'>
              Create Venue
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default CreateVenueForm
