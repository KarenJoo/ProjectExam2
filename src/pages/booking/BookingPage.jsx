import React from 'react'
import { Typography, Grid, Paper } from '@mui/material'
import BookingLayout from '../../components/Layout/Booking/BookingLayout';


const BookingPage = () => {
  return (
    <div className="contentContainer">
      <Typography variant="h1">Booking</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h2">Booking calendar</Typography>
            <BookingLayout />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookingPage;