import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { PrimaryButton } from './Styles/Buttons'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { styled } from '@mui/system'
import { Grid, Box } from '@mui/material'

const TruncatedText = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

const VenueCard = ({ venue }) => {
  const { name, description, media, price, meta, location } = venue

  const wifiStatus = meta?.wifi ? 'Yes' : 'No'
  const parkingStatus = meta?.parking ? 'Yes' : 'No'
  const breakfastStatus = meta?.breakfast ? 'Yes' : 'No'
  const petsStatus = meta?.pets ? 'Yes' : 'No'

  return (
    <Card
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        border: '0.5px solid #ccc',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.20)',
        height: '250px',
        width: '450px',
        maxWidth: '100%',
        '@media (min-width: 600px)': {
          height: '500px',
          width: '300px',
        },
      }}
    >
      <Grid
        container
        direction='row'
        sx={{
          '@media (min-width: 600px)': {
            flexDirection: 'column',
            minWidth: '400px',
          },
        }}
      >
        <Grid item xs={5} sm={4} md={4}>
          <CardMedia
            component='img'
            height='300px'
            image={media && media.length > 0 ? media[0].url : ''}
            alt={name}
            sx={{
              objectFit: 'cover',
              '@media (min-width: 600px)': {
                height: '220px',
                width: '330px',
              },
            }}
          />
        </Grid>
        <Grid item xs={7} sm={8} md={8} width={'100%'}>
          <CardHeader
            title={
              <TruncatedText
                variant='h1'
                sx={{
                  color: '#000',
                  margin: '0px',
                  padding: '0px',
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                {name}
              </TruncatedText>
            }
            subheader={
              <Typography
                variant='body2'
                sx={{
                  color: '#666',
                  marginTop: '8px',
                  fontSize: '10px',
                  textAlign: 'left',
                }}
              >
                <LocationOnIcon sx={{ height: '12px' }} />
                {`${location && location.city}, ${location && location.country}`}
              </Typography>
            }
          />

          <CardContent
            sx={{
              paddingY: '10px',
              '@media (min-width: 600px)': {
                paddingY: '0px',
                height: '130px',
                minWidth: '90%',
                margin: '0px auto',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <Box sx={{ height: '40px', margin: '0px auto' }}>
              <TruncatedText
                variant='body2'
                sx={{
                  color: '#333',
                  marginBottom: '10px',
                  fontSize: '10px',
                  '@media (min-width: 600px)': {
                    fontSize: '12px',
                  },
                  textAlign: 'left',
                }}
              >
                {description}
              </TruncatedText>
            </Box>
            <Typography
              variant='body2'
              sx={{
                color: '#666',
                fontSize: '10px',
                textAlign: 'left',
                '@media (min-width: 600px)': {
                  marginTop: '30px',
                },
              }}
            >
              WiFi: {wifiStatus} | Parking: {parkingStatus} | Breakfast:{' '}
              {breakfastStatus} | Pets: {petsStatus}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: '#000',
                fontSize: '12px',
                marginTop: '10px',
                '@media (min-width: 600px)': {
                  marginTop: '20px',
                },
              }}
            >
              {price} NOK
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Link to={`/venue/${venue.id}`} style={{ textDecoration: 'none' }}>
              <PrimaryButton variant='contained' sx={{ fontSize: '12px' }}>
                Book Now
              </PrimaryButton>
            </Link>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}
export default VenueCard
