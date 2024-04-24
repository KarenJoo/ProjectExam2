import { useState } from 'react';

// Define roles as constants for better readability and scalability
const ROLES = {
  VENUE_MANAGER: 'venueManager',
  CUSTOMER: 'customer',
};

// Mock initial user state
const initialUser = {
  username: '',
  role: null, // Initially set the role to null
};

const useAuth = () => {
  const [user, setUser] = useState(initialUser);

  const login = (username, role) => {
    // Simulate successful login by setting the user state
    setUser({ username, role });
  };

  const logout = () => {
    // Simulate logout by resetting the user state
    setUser(initialUser);
  };

  const isAuthenticated = () => {
    // Check if the user is authenticated (based on the role)
    return user.role !== null;
  };

  const isVenueManager = () => {
    // Check if the user is a venue manager
    return user.role === ROLES.VENUE_MANAGER;
  };

  const registerUser = (userData) => {
    // Simulate user registration logic
    const { name, email, password, venueManager } = userData;
    const role = venueManager ? ROLES.VENUE_MANAGER : ROLES.CUSTOMER;
    login(name, role); // Log in the user after successful registration
  };

  return { user, login, logout, isAuthenticated, isVenueManager, registerUser };
};

export default useAuth;
