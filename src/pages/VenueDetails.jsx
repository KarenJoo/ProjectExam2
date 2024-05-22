import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VENUES_URL } from '../utils/api'
import useFetch from '../hooks/useFetch'
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  ImageList,
  ImageListItem,
  Rating,
  IconButton,
} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import PetsIcon from '@mui/icons-material/Pets'
import GroupIcon from '@mui/icons-material/Group'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BookingForm from '../components/Forms/BookingForm'
import useStorage from '../utils/useStorage'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const VenueDetails = () => {
  const { id } = useParams()
  const API_URL = `${VENUES_URL}/${id}?_owner=true&_bookings=true`
  const { data: venueDetails, loading, error } = useFetch(API_URL)
  const { isUserLoggedIn, getUserRole, loadToken } = useStorage()
  const accessToken = loadToken()
  const [selectedImage, setSelectedImage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (venueDetails && venueDetails.media && venueDetails.media.length > 0) {
      setSelectedImage(venueDetails.media[0].url)
      console.log('Venue Details:', venueDetails)
    }
  }, [venueDetails])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: Unable to load venue details.</div>
  }

  if (!venueDetails) {
    return <div>Error: Venue details not found.</div>
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

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : media.length - 1
    )
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < media.length - 1 ? prevIndex + 1 : 0
    )
  }

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
        <Box sx={{ width: '100%', height: 160, position: 'relative' }}>
          <IconButton
            onClick={handlePrevClick}
            sx={{
              position: 'absolute',
              left: 15,
              opacity: '70%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              color: '#000',
              backgroundColor: '#fff',
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={handleNextClick}
            sx={{
              position: 'absolute',
              right: 10,
              opacity: '70%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              color: '#000',
              backgroundColor: '#fff',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <ImageList
            sx={{
              width: '96%',
              height: '170px',
              padding: 1,
              overflow: 'hidden',
              marginTop: '0px',
            }}
            variant='masonry'
            cols={3}
            gap={2}
          >
            {media &&
              media.slice(currentIndex, currentIndex + 3).map((item, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => setSelectedImage(item.url)}
                >
                  <img
                    src={`${item.url}`}
                    alt={name}
                    loading='lazy'
                    style={{
                      height: '150px',
                      width: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </Box>
        <CardContent>
          <Typography variant='h1' color='#01333e' fontSize={'1.5em'}>
            {name}
          </Typography>
          <Typography variant='body2' paragraph>
            <LocationOnIcon sx={{ height: '12px' }} />

            {address}
          </Typography>{' '}
          <Typography variant='p' paragraph>
            Host: {owner && owner.name ? owner.name : 'Unknown Owner'}
          </Typography>
          <Typography variant='p' color={'#000'} paragraph>
            {description}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              overflowX: 'hidden',
              mb: 2,
              width: '100%',
              boxShadow: 'none',
            }}
          >
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: '4px' }}>
                    <WifiIcon fontSize='small' />
                    <Typography variant='caption'>Wifi</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    <LocalParkingIcon fontSize='small' />
                    <Typography variant='caption'>Parking</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    <FreeBreakfastIcon fontSize='small' />
                    <Typography variant='caption'>Breakfast</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    <PetsIcon fontSize='small' />
                    <Typography variant='caption'>Pets</Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    <GroupIcon fontSize='small' />
                    <Typography variant='caption'>Guests</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ padding: '4px' }}>{wifiAvailable}</TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    {parkingAvailable}
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>
                    {breakfastIncluded}
                  </TableCell>
                  <TableCell sx={{ padding: '4px' }}>{petsAllowed}</TableCell>
                  <TableCell sx={{ padding: '4px' }}>{maxGuests}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              width: '100vw',
              alignItems: 'center',
              textAlign: 'center',
              mb: 2,
              fontSize: '12px',
            }}
          >
            Reviews:{' '}
            <Rating
              name='read-only'
              value={rating}
              readOnly
              precision={0.5}
              sx={{ margin: '10px auto', textAlign: 'center' }}
            />
          </Box>
          <Typography
            variant='h2'
            sx={{ margin: '10px auto', textAlign: 'center' }}
          >
            {price} NOK
          </Typography>
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
        ></Box>
      </Card>

      <Box
        sx={{ height: '80%', width: '80%', mb: 3, mt: 2, margin: '10px auto' }}
      >
        <BookingForm
          onSubmit={handleBookingSubmit}
          accessToken={accessToken}
          venueId={id}
          isLoggedIn={isUserLoggedIn()}
          isCustomer={!getUserRole() || getUserRole() === 'customer'}
        />

        <Box
          sx={{
            height: 'auto',
            width: '90%',
            mb: 3,
            mt: 2,
            margin: '0px auto',
            backgroundColor: '#fff',
            borderRadius: '2px',
            padding: '20px',
          }}
        >
          <Typography variant='h4' gutterBottom>
            Bookings:
          </Typography>
          <Box sx={'20px'}>
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
              <Typography variant='p'>
                No bookings found for this venue.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default VenueDetails
