import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const NonLoggedInRoutes = () => {
    const { isLoggedIn } = useContext(AuthContext);
    console.log("isLogg in on login routes", isLoggedIn)
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

export default NonLoggedInRoutes

