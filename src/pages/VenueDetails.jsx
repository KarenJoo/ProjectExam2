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
            maxWidth: '700px',
          },
          width: '90%',
          mx: 'auto',
          backgroundColor: '#ffffff',
          border: '0.5px solid #fde8c9',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            '@media (min-width: 600px)': {
              flexDirection: 'column',
              width: '700px',
            },
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
                media
                  .slice(currentIndex, currentIndex + 3)
                  .map((item, index) => (
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
          <Typography
            variant='p'
            paragraph
            sx={{
              color: '#000',
              '@media (min-width: 600px)': {
                marginTop: '50px',
              },
            }}
          >
            {description}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              overflowX: 'hidden',
              mb: 2,
              width: '100%',
              boxShadow: 'none',
              '@media (min-width: 600px)': {
                marginTop: '100px',
              },
            }}
          >
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: '4px', textAlign: 'center' }}>
                    <WifiIcon fontSize='small' />
                    <Typography variant='caption' fontSize='10px'>
                      Wifi
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px', textAlign: 'center' }}>
                    <LocalParkingIcon fontSize='small' />
                    <Typography variant='caption' fontSize='10px'>
                      Parking
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px', textAlign: 'center' }}>
                    <FreeBreakfastIcon fontSize='small' />
                    <Typography variant='caption' fontSize='10px'>
                      Breakfast
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px', textAlign: 'center' }}>
                    <PetsIcon fontSize='small' />
                    <Typography variant='caption' fontSize='10px'>
                      Pets
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '4px', textAlign: 'center' }}>
                    <GroupIcon fontSize='small' />
                    <Typography variant='caption' fontSize='10px'>
                      Guests
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {wifiAvailable}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {parkingAvailable}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {breakfastIncluded}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {petsAllowed}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {maxGuests}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              width: '200px',
              alignItems: 'center',
              textAlign: 'center',
              mb: 2,
              fontSize: '12px',
              '@media (min-width: 600px)': {
                mt: '50px',
              },
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
        sx={{ height: '90%', width: '90%', mb: 3, mt: 2, margin: '10px auto' }}
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
            width: '94%',
            mb: 3,
            margin: '20px auto',
            backgroundColor: '#fff',
            borderRadius: '4px',
            padding: '20px',
          }}
        >
          <Typography variant='h4' gutterBottom>
            Bookings:
          </Typography>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card
                key={booking.id}
                sx={{
                  mb: 1,
                  backgroundColor: '#01333e09',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardContent sx={{ padding: '10px' }}>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#01333e',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                    }}
                  >
                    Date From:{' '}
                    <Typography
                      variant='body2'
                      component='span'
                      sx={{ color: '#000', marginLeft: '5px' }}
                    >
                      {formatDate(booking.dateFrom)}
                    </Typography>
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#01333e',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                    }}
                  >
                    Date To:{' '}
                    <Typography
                      variant='body2'
                      component='span'
                      sx={{ color: '#000', marginLeft: '5px' }}
                    >
                      {formatDate(booking.dateTo)}
                    </Typography>
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#01333e',
                      fontWeight: 'bold',
                      marginBottom: '5px',
                    }}
                  >
                    Booked by:{' '}
                    <Typography
                      variant='body2'
                      component='span'
                      sx={{ color: '#000', marginLeft: '5px' }}
                    >
                      {booking.customer && booking.customer.name}
                    </Typography>
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
  )
}
export default VenueDetails
