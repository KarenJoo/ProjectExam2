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
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const TruncatedText = styled(Typography)(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

const VenueCard = ({ venue }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
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
        height: '270px', // Default height for small screens
        width: '550px', // Default width for small screens
        maxWidth: '100%',
        '@media (min-width: 600px)': { // Adjustments for larger screens
          height: '250px',
          width: '500px',
        },
      }}
    >
      <Grid container direction="row">
        <Grid item xs={4} sm={4} md={4}>
          <CardMedia
            component='img'
            height='300px'
            image={media && media.length > 0 ? media[0].url : ''}
            alt={name}
            sx={{ objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <CardHeader
            title={
              <Typography variant='h1' sx={{ color: '#000', margin: '0px', padding: '0px', fontSize: '15px', textAlign: 'left' }}>
                {name}
              </Typography>
            }
            subheader={
              <Typography variant='body2' sx={{ color: '#666', marginTop: '8px', fontSize: '12px', textAlign: 'left' }}>
                {`Location: ${location && location.city}, ${location && location.country}`}
              </Typography>
            }
          />
          <CardContent>
            <TruncatedText
              variant='body2'
              sx={{ color: '#333', marginBottom: '10px', fontSize: '12px', textAlign: 'left' }}
            >
              {description}
            </TruncatedText>
            <Typography
              variant='body2'
              sx={{ color: '#666', marginBottom: '8px', fontSize: '10px', textAlign: 'left' }}
            >
              WiFi: {wifiStatus} | Parking: {parkingStatus} | Breakfast:{' '}
              {breakfastStatus} | Pets: {petsStatus}
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: '#000', fontSize: '12px' }}
            >
              {price} NOK
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Link
              to={`/venue/${venue.id}`}
              style={{ textDecoration: 'none' }}
            >
              <PrimaryButton variant='contained' sx={{ fontSize: '12px' }}>
                Book Now
              </PrimaryButton>
            </Link>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
export default VenueCard
