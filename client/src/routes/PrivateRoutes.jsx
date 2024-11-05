import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn, "isLoggedIn on private routes");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes