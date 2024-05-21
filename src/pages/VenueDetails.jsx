import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VENUES_URL } from '../utils/api'
import useFetch from '../hooks/useFetch'
import { Box, Card, CardContent, Typography, CardMedia, ImageList, ImageListItem  } from '@mui/material'
import BookingForm from '../components/Forms/BookingForm'
import useStorage from '../utils/useStorage'

const VenueDetails = () => {
  const { id } = useParams()
  const API_URL = `${VENUES_URL}/${id}?_owner=true&_bookings=true`
  const { data: venueDetails, loading, error } = useFetch(API_URL)
  const { isUserLoggedIn, getUserRole, loadToken } = useStorage()
  const accessToken = loadToken()
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (venueDetails && venueDetails.media && venueDetails.media.length > 0) {
      setSelectedImage(venueDetails.media[0].url);
      console.log('Venue Details:', venueDetails);
    }
  }, [venueDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Unable to load venue details.</div>;
  }

  if (!venueDetails) {
    return <div>Error: Venue details not found.</div>;
  }


  const {
    name,
    description,
    media,
    price,
    maxGuests,
    meta,
    location,
    rating,
    owner,
    bookings,
  } = venueDetails

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleBookingSubmit = () => {
    console.log('Booking submitted')
  }

  const wifiAvailable = meta?.wifi ? 'Yes' : 'No'
  const parkingAvailable = meta?.parking ? 'Yes' : 'No'
  const breakfastIncluded = meta?.breakfast ? 'Yes' : 'No'
  const petsAllowed = meta?.pets ? 'Allowed' : 'No'

  const address = location
    ? `${location.address}, ${location.city}, ${location.country}`
    : 'Address not available'

  return (
    <Box
      sx={{ height: '100%', width: '100%', mb: 3, mt: 2, marginTop: '100px' }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '@media (min-width: 600px)': {
            flexDirection: 'row',
            height: 'auto',
            width: '700px',
          },
          width: '80%',
          mx: 'auto',
          my: 1,
          p: 1,
          backgroundColor: '#ffffff',
          border: '0.5px solid #fde8c9',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 1,
        }}
      >
  <CardMedia
          component='img'
          image={selectedImage}
          alt={name}
          sx={{ height: '400px', width: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ width: '100%', height: 200 }}>
          <ImageList
            sx={{ width: '100%', height: '200px' }}
            variant="masonry"
            cols={3}
            gap={8}
          >
            {media && media.map((item, index) => (
              <ImageListItem key={index} onClick={() => setSelectedImage(item.url)}>
                <img
                  src={`${item.url}`}
                  alt={name}
                  loading="lazy"
                  style={{ height: '150px', width: '100%', objectFit: 'cover', cursor: 'pointer' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <CardContent>
          <Typography variant='h2' gutterBottom>
            {name}
          </Typography>
          <Typography variant='body1' paragraph>
            {description}
          </Typography>
          <Typography variant='body2' paragraph>
            Address: {address} | Max Guests: {maxGuests}
          </Typography>
          <Typography variant='body2' paragraph>
            Rating: {rating}
          </Typography>
          <Typography variant='body2' paragraph>
            Owner: {owner && owner.name ? owner.name : 'Unknown Owner'}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant='body2'>WiFi: {wifiAvailable}</Typography>
            <Typography variant='body2'>Parking: {parkingAvailable}</Typography>
            <Typography variant='body2'>
              Breakfast: {breakfastIncluded}
            </Typography>
            <Typography variant='body2'>Pets: {petsAllowed}</Typography>
          </Box>

          <BookingForm
            onSubmit={handleBookingSubmit}
            accessToken={accessToken}
            venueId={id}
            isLoggedIn={isUserLoggedIn()}
            isCustomer={!getUserRole() || getUserRole() === 'customer'}
          />

          <Typography variant='h3' gutterBottom>
            Bookings:
          </Typography>
          <Box>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id} sx={{ mb: 1 }}>
                  <CardContent>
                    <Typography variant='subtitle1'>
                      Date From: {formatDate(booking.dateFrom)}
                    </Typography>
                    <Typography variant='subtitle1'>
                      Date To: {formatDate(booking.dateTo)}
                    </Typography>
                    <Typography variant='subtitle1'>
                      User: {booking.customer && booking.customer.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant='subtitle1'>
                No bookings found for this venue.
              </Typography>
            )}
          </Box>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
            mb: 1,
          }}
        >
          <Typography variant='body2'>{price} NOK</Typography>
        </Box>
      </Card>
    </Box>
  )
}
export default VenueDetails
