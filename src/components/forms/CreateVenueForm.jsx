import React, { useState } from 'react'
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
} from '@mui/material'
import { VENUES_URL } from '../../utils/api'

const CreateVenueForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    maxGuests: 0,
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    location: {
      address: '',
      city: '',
      country: '',
    },
    media: [
      {
        url: '',
        alt: '',
      },
    ],
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((state) => ({
        ...state,
        [name]: checked,
      }))
    } else if (name === 'url') {
      // Handle image URL change
      setFormData((state) => ({
        ...state,
        media: [
          {
            ...state.media[0],
            url: value,
          },
        ],
      }))
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(VENUES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create venue')
      }

      const data = await response.json()
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(formData)
      }}
    >
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.wifi}
                onChange={handleChange}
                name='wifi'
                color='secondary'
              />
            }
            label='WiFi Available'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.parking}
                onChange={handleChange}
                name='parking'
                color='secondary'
              />
            }
            label='Parking Available'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.breakfast}
                onChange={handleChange}
                name='breakfast'
                color='secondary'
              />
            }
            label='Breakfast Included'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.pets}
                onChange={handleChange}
                name='pets'
                color='secondary'
              />
            }
            label='Pets Allowed'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Address'
            name='address'
            value={formData.location.address}
            onChange={(e) =>
              setFormData((state) => ({
                ...state,
                location: {
                  ...state.location,
                  address: e.target.value,
                },
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='City'
            name='city'
            value={formData.location.city}
            onChange={(e) =>
              setFormData((state) => ({
                ...state,
                location: {
                  ...state.location,
                  city: e.target.value,
                },
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label='Country'
            name='country'
            value={formData.location.country}
            onChange={(e) =>
              setFormData((state) => ({
                ...state,
                location: {
                  ...state.location,
                  country: e.target.value,
                },
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Image URL'
            name='url'
            value={formData.media[0].url}
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
  )
}

export default CreateVenueForm
