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

const CreateVenueForm = ({ onSubmit }) => {

  const storage = useStorage();

  const userData = storage.loadUserData();
  const getAccessToken = userData ? userData.accessToken : null;
  const [accessToken, setAccessToken] = useState(getAccessToken); 
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
      lat: 0,
      lng: 0,
    },
    media: [
      {
        url: '',
        alt: '',
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          [name]: checked,
        },
      }));
    } else if (name === 'url') {
      setFormData((prevState) => ({
        ...prevState,
        media: [
          {
            ...prevState.media[0],
            url: value,
          },
        ],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (formData) => {
    try {

      const response = await fetch(VENUES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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

  console.log('Access Token:', accessToken);

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
