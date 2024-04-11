import React from 'react';
import Button from '@mui/material/Button';

const ButtonUsage = () => {
  return (
    <Button variant="outlined" color="primary">
      Book
    </Button>
  );
};

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <ButtonUsage />
    </div>
  );
};

export default Homepage;
