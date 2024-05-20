import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { SecondaryButton, PrimaryButton } from './Styles/Buttons'

const VenueCard = ({ venue }) => {
  const { name, description, media, price, maxGuests, meta, location } = venue

  const wifiStatus = meta?.wifi ? 'Yes' : 'No'
  const parkingStatus = meta?.parking ? 'Yes' : 'No'
  const breakfastStatus = meta?.breakfast ? 'Yes' : 'No'
  const petsStatus = meta?.pets ? 'Yes' : 'No'

  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        color: '#fff',
        border: '0.5px solid #fff',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.20)',
      }}
    >
      <CardMedia
        component='img'
        height='194'
        image={media && media.length > 0 ? media[0].url : ''}
        alt={name}
      />
      <CardHeader
        title={
          <Typography
            variant='h1'
            sx={{
              textAlign: 'left',
              padding: '0px',
              marginBottom: '10px',
              fontSize: '20px',
              color: '#000',
            }}
          >
            {name}
          </Typography>
        }
        subheader={
          <Typography
            variant='p'
            sx={{
              textAlign: 'left',
              padding: '0px',
              fontSize: '12px',
              color: '#000',
            }}
          >{`Max Guests: ${maxGuests} | Location: ${location && location.city}, ${location && location.country}`}</Typography>
        }
      />

      <CardContent>
        <Typography
          variant='body2'
          sx={{
            color: '#000',
            textAlign: 'left',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          {description}
        </Typography>
        <Typography
          variant='body2'
          sx={{ textAlign: 'left', color: '#000', fontSize: '12px' }}
        >
          WiFi: {wifiStatus} | Parking: {parkingStatus} | Breakfast:{' '}
          {breakfastStatus} | Pets: {petsStatus}
        </Typography>
        <Typography
          variant='body1'
          sx={{ marginTop: '20px', fontSize: '20px', color: '#000' }}
        >
          {price} NOK
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/venue/${venue.id}`}
          style={{
            textDecoration: 'none',
            margin: '0px auto',
            marginBottom: '10px',
          }}
        >
          <PrimaryButton variant='contained'>Book Now</PrimaryButton>
        </Link>
      </CardActions>
    </Card>
  )
}

export default VenueCard
