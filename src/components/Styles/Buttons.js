import { styled } from '@mui/system';
import { Button } from '@mui/material';


  
  // Filled button
  export const PrimaryButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#01333e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
  }));
  
  export const SecondaryButton = styled(Button)(({ theme }) => ({
    color: '#01333e',
    border: '2px solid #01333e',
    '&:hover': {
      border: '2px solid #01333e',
    },
  }));


const ViewMoreButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
    marginBottom: '16px',
    
  });
  
  const ViewMoreButton = ({ onClick }) => (
    <ViewMoreButtonContainer>
      <Button onClick={onClick} variant="contained" color="primary" >
        View More
      </Button>
    </ViewMoreButtonContainer>
  );
  
  export default ViewMoreButton;