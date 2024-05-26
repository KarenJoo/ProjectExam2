import CreateIcon from '@mui/icons-material/Create'
import LogoutIcon from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../storage/reducers/authReducer'
import Logout from './Logout'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const isLoggedIn = useSelector((state) => state.auth.loggedIn)
  const isVenueManager = useSelector((state) => state.auth.isVenueManager)
  const dispatch = useDispatch()
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const navigate = useNavigate()

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn)
  }, [isLoggedIn])

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    handleClose()
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        bgcolor: 'rgba(1, 51, 62, 0.9)',
        width: '100%',
        overflowX: 'hidden',
        zIndex: 1100,
      }}
    >
      {/* Logo or Brand */}
      <Typography variant='h1' sx={{ color: '#fde8c9' }}>
        <Link to={`/`} className='link'>
          Holidaze
        </Link>
      </Typography>

      {isLoggedIn ? (
        isLargeScreen ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant='body1'
              sx={{ color: '#fde8c9', marginRight: 2 }}
            >
              <Link to='/profile' className='link'>
                Profile
              </Link>
            </Typography>

            <Typography
              variant='body1'
              sx={{ color: '#fde8c9', marginRight: '20px' }}
            >
              <Link to='/' className='link' onClick={handleLogout}>
                Logout
              </Link>
            </Typography>
          </Box>
        ) : (
          <Tooltip title='Account settings'>
            <IconButton
              className='profileBtn'
              onClick={handleClick}
              size='small'
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              sx={{ color: '#01333e' }}
            >
              <Avatar
                className='profileIcon'
                sx={{
                  bgcolor: '#01333e',
                  color: '#fde8c9',
                  boxShadow: '0 0 0 1px #fde8c9',
                  marginRight: '20px',
                }}
              >
                P
              </Avatar>
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Typography
          variant='body1'
          sx={{ color: '#fde8c9', marginRight: '20px' }}
        >
          <Link to={`/login`} className='link'>
            Log in
          </Link>
        </Typography>
      )}

      {/* Dropdown Menu for Small Screens */}
      {!isLargeScreen && (
        <Popper
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          placement='bottom-end'
          style={{ zIndex: 1300 }}
        >
          <Paper
            sx={{
              backgroundColor: 'rgba(1, 51, 62, 0.9)',
              width: '150px',
              height: 'auto',
              marginTop: '10px',
              padding: '0px',
              borderRadius: '0px',
            }}
          >
            {/* profile link */}
            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: '12px', color: '#fde8c9' }}
              component={Link}
              to='/profile'
            >
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  mr: 1,
                  color: '#01333e',
                  backgroundColor: '#fde8c9',
                }}
              >
                P
              </Avatar>
              Profile
            </MenuItem>

            {/* create venue */}
            {!isVenueManager && (
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: '12px', color: '#fde8c9' }}
                component={Link}
                to='/create'
              >
                <ListItemIcon sx={{ color: '#fde8c9' }}>
                  <CreateIcon fontSize='small' />
                </ListItemIcon>
                Create venue
              </MenuItem>
            )}

            <MenuItem
              onClick={handleClose}
              sx={{ fontSize: '12px', color: '#fde8c9' }}
              component={Link}
              to='/'
            >
              {/* logout  */}
              <ListItemIcon>
                <LogoutIcon fontSize='small' sx={{ color: '#fde8c9' }} />
              </ListItemIcon>
              <Logout />
            </MenuItem>
          </Paper>
        </Popper>
      )}
    </Box>
  )
}

export default Navbar
