import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const isAuthenticated = true // get the value from redux
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes