import React from 'react'
import { Typography } from '@mui/material'
import BookingLayout from '../../components/Layout/Booking/BookingLayout'

const BookingPage = () => {
  return (
    
    <div className='contentContainer'>
        <Typography variant='h1' margin={'10px auto'} height= '20px' textAlign='center' alignItems={'center'} width={'100px'} display={'flex'} backgroundColor='#000'>
        Booking
      </Typography>{' '}
      

      <BookingLayout />
    </div>
  )
}

export default BookingPage
