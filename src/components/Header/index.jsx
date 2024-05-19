import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'
import Logout from './Logout'
import CreateIcon from '@mui/icons-material/Create'
import { logout } from '../../storage/reducers/authReducer'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const isLoggedIn = useSelector((state) => state.auth.loggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn)
  }, [isLoggedIn])
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleClose();
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl, open]);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        bgcolor: 'rgba(1, 51, 62, 0.8)',
        maxWidth: '100vw',
        width: '100%',
        minWidth: '100%',
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

      {/* Account Settings Button */}
      {isLoggedIn && (
        <Tooltip title='Account settings'>
          <IconButton
            className='profileBtn'
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            sx={{ color: '#01333e', bgcolor: '#01333e' }}
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
      )}

      {/* Dropdown Menu */}
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
            width: '200px',
            marginTop: '10px',
            padding: '20px',
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

          <MenuItem
            onClick={handleLogout}
            sx={{ fontSize: '12px', color: '#fde8c9' }}
          >
            {/* logout  */}
            <ListItemIcon>
              <LogoutIcon fontSize='small' sx={{ color: '#fde8c9' }} />
            </ListItemIcon>
            <Logout />
          </MenuItem>
        </Paper>
      </Popper>

      {/* login link */}
      {!isLoggedIn && (
        <Typography variant='body1' sx={{ color: '#fde8c9' }}>
          <Link to={`/login`} className='link'>
            Log in
          </Link>
        </Typography>
      )}
    </Box>
  );
};



export default Navbar
