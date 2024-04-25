import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, Grid } from '@mui/material';
import { VENUES_URL } from '../../utils/api';
import useStorage from '../../utils/useStorage';

const CreateVenueForm = ({ onSubmit }) => {
  const storage = useStorage();
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
  });

  useEffect(() => {
    // Load user data (if available) when the component mounts
    const userData = storage.loadUserData();
    if (userData) {
      // Initialize form data based on user data (if available)
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: userData.name || '',
        // Initialize other form fields based on userData
      }));
    }
  }, [storage]); // Re-run effect if storage changes (e.g., userData)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(VENUES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create venue');
      }

      console.log('Venue created successfully:', data);
      alert('Venue created successfully!');

      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.error('Failed to create venue:', error);
      alert('Failed to create venue');
    }
  };

  return (
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
                checked={formData.meta.wifi}
                onChange={handleChange}
                name='wifi'
                color='primary'
              />
            }
            label='WiFi Available'
          />
          {/* Add other checkboxes for parking, breakfast, pets */}
        </Grid>
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
          <Button type='submit' variant='outlined' color='primary'>
            Create Venue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateVenueForm;
