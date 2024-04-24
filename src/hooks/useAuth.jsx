
import { useState } from 'react';

// Mock user data (replace this with actual user authentication logic)
const userRole = {
  username: '',
  venueManager: true, 
  customer: false, 
};

const useAuth = () => {
  const [user, setUser] = useState(userRole); 

  const login = () => {
    setUser(userRole); 
  };

  const logout = () => {
    setUser(null); 
  };

  return { user, login, logout };
};

export default useAuth;
