
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useStorage from './useStorage';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const { isUserLoggedIn, getUserRole } = useStorage();
  const isLoggedIn = isUserLoggedIn();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
