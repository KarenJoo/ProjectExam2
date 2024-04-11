import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={styles.navbarContainer}>
      {/* Contact and Profile */}
      <Typography className={styles.navbarTitle}>Contact</Typography>
      <Typography className={styles.navbarLink}>Book</Typography>

      {/* Account Settings Button */}
      <Tooltip title="Account settings">
        <IconButton
          className={styles.avatarButton}
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar className={styles.avatarIcon}>M</Avatar>
        </IconButton>
      </Tooltip>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          className: styles.menuItems,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Menu Items */}
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          <Avatar className={styles.menuItemIcon} />
          Profile
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          <Avatar className={styles.menuItemIcon} />
          My account
        </MenuItem>
        <Divider />
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          <ListItemIcon className={styles.menuItemIcon}>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          <ListItemIcon className={styles.menuItemIcon}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClose}>
          <ListItemIcon className={styles.menuItemIcon}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
