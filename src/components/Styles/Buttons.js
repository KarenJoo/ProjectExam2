import { styled } from '@mui/system';
import { Button } from '@mui/material';


  
  // Filled button
  export const PrimaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'primary',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
  }));
  
  export const SecondaryButton = styled(Button)(({ theme }) => ({
    color: 'primary',
    border: '2px solid primary',
    '&:hover': {
      border: '2px solid primary',
    },
  }));


export const ViewMoreButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
    marginBottom: '16px',
    
  });
  
  export const ViewMoreButton = ({ onClick }) => (
    <ViewMoreButtonContainer>
      <Button onClick={onClick} variant="contained" color="secondary" >
        View More
      </Button>
    </ViewMoreButtonContainer>
  );
  
  export default ViewMoreButton;