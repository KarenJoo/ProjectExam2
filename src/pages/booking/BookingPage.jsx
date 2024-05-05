import React from 'react'
import { Typography, Grid } from '@mui/material'
import BookingLayout from '../../components/Layout/Booking/BookingLayout';


const BookingPage = () => {
  return (
    <div className="contentContainer">
      <Grid container justifyContent="center">
        <Typography variant="h1" textAlign="left">Booking</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <BookingLayout />
        </Grid>
      </Grid>
    </div>
  );
};


export default BookingPage;