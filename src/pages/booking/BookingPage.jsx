import React from 'react'
import { Typography, Grid, Paper } from '@mui/material'
import BookingForm from '../../components/Booking/BookingForm'
import Calendar from '../../components/Booking/Calendar';

export default function BookingPage() {
  return (
    <div className='contentContainer'>
      <Typography variant='h1'>Booking</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h2'>Calendar</Typography>
            <Calendar />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h2'>Booking Form</Typography>
            <BookingForm />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
