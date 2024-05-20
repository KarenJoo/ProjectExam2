import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { PrimaryButton } from './Styles/Buttons'
import { styled } from '@mui/system'

const TruncatedText = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

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
        height: '500px',
        width: '250px',
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
              margin: '0px',
              fontSize: '20px',
              color: '#000',
            }}
          >
            {name}
          </Typography>
        }
        subheader={
          <Typography
            variant='subtitle2'
            sx={{
              textAlign: 'left',
              padding: '0px',
              marginTop: '4px',
              fontSize: '12px',
              color: '#000',
            }}
          >
            {` Location: ${location && location.city}, ${location && location.country}`}
          </Typography>
        }
        sx={{
          paddingBottom: '4px',
        }}
      />
      <CardContent>
        <TruncatedText
          variant='body2'
          sx={{
            color: '#000',
            textAlign: 'left',
            marginBottom: '20px',
          }}
        >
          {description}
        </TruncatedText>
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
