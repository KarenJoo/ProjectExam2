import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, Grid } from '@mui/material';

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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Venue Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
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
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Max Guests"
            name="maxGuests"
            type="number"
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
                name="wifi"
                color="primary"
              />
            }
            label="WiFi Available"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.parking}
                onChange={handleChange}
                name="parking"
                color="primary"
              />
            }
            label="Parking Available"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.breakfast}
                onChange={handleChange}
                name="breakfast"
                color="primary"
              />
            }
            label="Breakfast Included"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.pets}
                onChange={handleChange}
                name="pets"
                color="primary"
              />
            }
            label="Pets Allowed"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.location.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  address: e.target.value,
                },
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.location.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  city: e.target.value,
                },
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formData.location.country}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  country: e.target.value,
                },
              }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create Venue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateVenueForm;
