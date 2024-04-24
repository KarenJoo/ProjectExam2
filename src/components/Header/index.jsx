import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Link } from 'react-router-dom'
import Logout from './Logout'

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
        maxWidth: '100%',
        height: '70px',
        backgroundColor: 'rgba(1, 51, 62, 0.4)',
        padding: '0 10px',
        overflowX: 'hidden',
      }}
    >
      {/* menu */}
      <Typography variant='body1' sx={{ color: '#fde8c9' }}>
        menu
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
            backgroundColor: 'rgba(1, 51, 62, 0.5)',
            minWidth: '150px',
            marginTop: '10px',
            marginLeft: '20px',
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
        {/* Menu Items */}
        <MenuItem
          onClick={handleClose}
          sx={{ fontSize: '12px', color: '#fde8c9' }}
          component={Link} to="/profile"
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
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{ fontSize: '12px', color: '#fde8c9' }}
        >
          <ListItemIcon>
            <PersonAddIcon fontSize='small' sx={{ color: '#fde8c9' }} />
          </ListItemIcon>
          Book
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ fontSize: '12px', color: '#fde8c9' }}
        >
          <ListItemIcon sx={{ color: '#fde8c9' }}>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          Create
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ fontSize: '12px', color: '#fde8c9' }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize='small' sx={{ color: '#fde8c9' }} />
          </ListItemIcon>
          Logout
          <Logout />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Navbar
