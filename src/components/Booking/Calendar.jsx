import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Typography, Grid } from '@mui/material'

const Calendar = ({ value, onChange }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container direction="column" alignItems="center" justifyContent="center">
          <Typography variant='h5' margin='10px auto'>
            Booking calendar
          </Typography>
          <DateCalendar
            value={value}
            onChange={onChange}
            sx={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              margin: '0 auto',
            }}
          />
        </Grid>
      </LocalizationProvider>
    );
  };
  

export default Calendar
