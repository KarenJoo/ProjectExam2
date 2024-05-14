import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        backgroundColor: 'rgba(1, 51, 62, 0.8)',
        overflowX: 'hidden',
      }}
    >
      {/* menu */}
      <Typography variant='body1' sx={{ color: '#fde8c9', marginLeft: '20px' }}>
        <Link to={`/login`} className='link'>
          Log in
        </Link>
      </Typography>

      {/* Logo or Brand */}
      <Typography variant='h1' sx={{ color: '#fde8c9' }}>
        <Link to={`/`} className='link'>
          Holidaze
        </Link>
      </Typography>

      {/* Account Settings Button */}
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          sx={{
            color: '#01333e',
            backgroundColor: '#01333e',
            '&:hover': {
              backgroundColor: '#01333e',
            },
          }}
        >
          <Avatar
            sx={{
              backgroundColor: '#01333e',
              color: '#fde8c9',
              marginRight: '30px',

              boxShadow: '0 0 0 1px #fde8c9',
              '&:hover': {
                boxShadow: '0 0 0 3px #fde8c9',
              },
            }}
          >
            P
          </Avatar>
        </IconButton>
      </Tooltip>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: 'rgba(1, 51, 62, 0.9)',
            width: '50%',
            marginLeft: '20px',
            marginTop: '10px',
            padding: '20px',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {/* profile */}
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

        {/* book venue */}
        <MenuItem
          onClick={handleClose}
          sx={{ fontSize: '12px', color: '#fde8c9' }}
        >
          <ListItemIcon>
            <AddIcon fontSize='small' sx={{ color: '#fde8c9' }} />
          </ListItemIcon>
          Book
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
          onClick={handleClose}
          sx={{ fontSize: '12px', color: '#fde8c9' }}
        >
          {/* logout  */}
          <ListItemIcon>
            <LogoutIcon fontSize='small' sx={{ color: '#fde8c9' }} />
          </ListItemIcon>
          <Logout />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Navbar
