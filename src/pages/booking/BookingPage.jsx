import React from 'react'
import { Typography, Grid } from '@mui/material'
import BookingLayout from '../../components/Layout/Booking/BookingLayout';



const BookingPage = () => {
  return (
    <div className="contentContainer">
      <Grid container justifyContent="center">
        <Typography variant="h1" textAlign="left">Booking</Typography>
      </Grid>
      
          <BookingLayout />
    </div>
  );
};

export default BookingPage;