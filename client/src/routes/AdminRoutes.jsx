import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
  const isAuthenticated = true // need to update 
  const isAdmin = true // need to update
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoutes